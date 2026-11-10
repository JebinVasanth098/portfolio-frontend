import { useEffect, useState } from 'react';
import { getHealth } from '../api.js';

const MAX_SAMPLES = 30;
const INTERVAL_MS = 5000;

function Sparkline({ samples }) {
  const w = 300;
  const h = 56;
  const pad = 4;
  if (samples.length < 2) {
    return <svg className="spark" viewBox={`0 0 ${w} ${h}`} aria-hidden="true" />;
  }
  const max = Math.max(50, ...samples);
  const step = (w - pad * 2) / (MAX_SAMPLES - 1);
  const offset = (MAX_SAMPLES - samples.length) * step;
  const points = samples
    .map((ms, i) => {
      const x = pad + offset + i * step;
      const y = h - pad - (ms / max) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function formatUptime(seconds) {
  if (typeof seconds !== 'number') return null;
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function StatusPanel() {
  const [state, setState] = useState('checking'); // checking | up | down
  const [samples, setSamples] = useState([]);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let alive = true;

    async function ping() {
      if (document.hidden) return; // don't poll from background tabs
      try {
        const { data, ms } = await getHealth();
        if (!alive) return;
        setInfo(data);
        setState('up');
        setSamples((s) => [...s.slice(-(MAX_SAMPLES - 1)), ms]);
      } catch {
        if (alive) setState('down');
      }
    }

    ping();
    const id = setInterval(ping, INTERVAL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const last = samples[samples.length - 1];
  const avg = samples.length
    ? Math.round(samples.reduce((a, b) => a + b, 0) / samples.length)
    : null;
  const uptime = formatUptime(info?.uptime_seconds);

  return (
    <section className="status" aria-label="Live API status">
      <div className="status__bar">
        <span className={`dot dot--${state}`} aria-hidden="true" />
        <code>GET /api/health</code>
        <span className="status__state" role="status">
          {state === 'checking' && 'Checking'}
          {state === 'up' && (!info?.status || info.status === 'ok' ? 'Healthy' : info.status)}
          {state === 'down' && 'Unreachable'}
        </span>
      </div>

      {state === 'down' ? (
        <p className="status__msg">
          The API did not respond. Start the Python backend on port 8000 and this panel will recover on its own.
        </p>
      ) : (
        <>
          <div className={`status__chart status__chart--${state}`}>
            <Sparkline samples={samples} />
          </div>
          <dl className="status__stats">
            <div><dt>Latest</dt><dd>{last != null ? `${last} ms` : 'none yet'}</dd></div>
            <div><dt>Average</dt><dd>{avg != null ? `${avg} ms` : 'none yet'}</dd></div>
            {uptime && <div><dt>Uptime</dt><dd>{uptime}</dd></div>}
            {info?.version && <div><dt>Version</dt><dd>{info.version}</dd></div>}
          </dl>
        </>
      )}
      <p className="status__note">Round-trip time measured in your browser, refreshed every 5 seconds.</p>
    </section>
  );
}

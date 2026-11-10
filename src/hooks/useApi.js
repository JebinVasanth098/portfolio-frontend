import { useEffect, useState } from 'react';

// Loads data from the API. If the request fails (backend not running yet,
// or an endpoint not built yet) it falls back to local data so the site
// still renders while you build the backend.
export function useApi(fetcher, fallback, deps = []) {
  const [data, setData] = useState(fallback);
  const [status, setStatus] = useState('loading'); // loading | live | fallback

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    fetcher()
      .then((result) => {
        if (!alive) return;
        setData(result);
        setStatus('live');
      })
      .catch(() => {
        if (!alive) return;
        setData(fallback);
        setStatus('fallback');
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, status };
}

import { getProjects } from '../api.js';
import { useApi } from '../hooks/useApi.js';
import { fallbackProjects } from '../data/content.js';

export default function Projects() {
  const { data: projects } = useApi(getProjects, fallbackProjects);

  return (
    <section id="work" className="section">
      <div className="wrap">
        <h2>Work</h2>
        <ul className="rows">
          {projects.map((p) => (
            <li key={p.slug} className="row">
              <div className="row__main">
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
              </div>
              <div className="row__side">
                {p.stack?.length > 0 && (
                  <ul className="tags" aria-label="Technologies">
                    {p.stack.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}
                {p.links?.length > 0 && (
                  <ul className="inline-list">
                    {p.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

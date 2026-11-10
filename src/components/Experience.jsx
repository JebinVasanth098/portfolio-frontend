import { experience } from '../data/content.js';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <h2>Experience</h2>
        <ol className="timeline">
          {experience.map((e) => (
            <li key={`${e.org}-${e.period}`} className="timeline__item">
              <p className="timeline__period">{e.period}</p>
              <div>
                <h3>{e.role}, {e.org}</h3>
                <p>{e.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

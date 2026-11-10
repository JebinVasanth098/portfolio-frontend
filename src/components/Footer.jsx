import { profile } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <p>{profile.name}, {new Date().getFullYear()}</p>
        <ul className="inline-list">
          {profile.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

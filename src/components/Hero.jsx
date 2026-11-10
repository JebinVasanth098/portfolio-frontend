import { profile } from '../data/content.js';
import StatusPanel from './StatusPanel.jsx';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__role">{profile.name}, {profile.role.toLowerCase()}</p>
          <h1>{profile.headline}</h1>
          <p className="hero__intro">{profile.intro}</p>
          <p className="hero__actions">
            <a className="btn" href="#work">See my work</a>
            <a className="btn btn--ghost" href="#contact">Get in touch</a>
          </p>
        </div>
        <StatusPanel />
      </div>
    </section>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/content.js';

export default function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const to = (hash) => (onHome ? hash : `/${hash}`);

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link to="/" className="site-header__name">{profile.name}</Link>
        <nav aria-label="Main">
          <ul className="nav">
            <li><a href={to('#work')}>Work</a></li>
            <li><a href={to('#writing')}>Writing</a></li>
            <li><a href={to('#experience')}>Experience</a></li>
            <li><a href={to('#contact')}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

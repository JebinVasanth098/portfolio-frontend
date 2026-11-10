import { Link } from 'react-router-dom';
import { getPosts } from '../api.js';
import { useApi } from '../hooks/useApi.js';
import { fallbackPosts } from '../data/content.js';

export function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Writing() {
  const { data: posts } = useApi(getPosts, fallbackPosts);

  return (
    <section id="writing" className="section">
      <div className="wrap">
        <h2>Writing</h2>
        {posts.length === 0 ? (
          <p className="muted">No posts yet.</p>
        ) : (
          <ul className="rows">
            {posts.map((p) => (
              <li key={p.slug} className="row">
                <div className="row__main">
                  <h3><Link to={`/writing/${p.slug}`}>{p.title}</Link></h3>
                  <p>{p.summary}</p>
                </div>
                <div className="row__side">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  {p.readTime && <span>{p.readTime}</span>}
                  {p.tags?.length > 0 && (
                    <ul className="tags" aria-label="Tags">
                      {p.tags.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

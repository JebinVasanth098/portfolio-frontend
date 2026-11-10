import { Link, useParams } from 'react-router-dom';
import { getPost } from '../api.js';
import { useApi } from '../hooks/useApi.js';
import { fallbackPosts } from '../data/content.js';
import { formatDate } from '../components/Writing.jsx';
import PostBody from '../components/PostBody.jsx';
import NotFound from './NotFound.jsx';

export default function Post() {
  const { slug } = useParams();
  const fallback = fallbackPosts.find((p) => p.slug === slug) || null;
  const { data: post, status } = useApi(() => getPost(slug), fallback, [slug]);

  if (status === 'loading') return <div className="wrap section"><p className="muted">Loading</p></div>;
  if (!post) return <NotFound />;

  return (
    <article className="section">
      <div className="wrap wrap--narrow">
        <p><Link to="/#writing">Back to writing</Link></p>
        <h1 className="post__title">{post.title}</h1>
        <div className="post__meta muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readTime && <span>{post.readTime}</span>}
        </div>
        {post.tags?.length > 0 && (
          <ul className="tags post__tags" aria-label="Tags">
            {post.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        )}
        <PostBody body={post.body} />
      </div>
    </article>
  );
}
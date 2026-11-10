import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="section">
      <div className="wrap wrap--narrow">
        <h1 className="post__title">Page not found</h1>
        <p>That address does not exist. <Link to="/">Go to the home page</Link>.</p>
      </div>
    </div>
  );
}

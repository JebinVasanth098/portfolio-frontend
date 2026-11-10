export default function PostBody({ body }) {
  // Accept the old plain-text shape too, so nothing breaks mid-migration.
  const blocks = Array.isArray(body)
    ? body
    : String(body || '')
        .split(/\n\s*\n/)
        .map((content) => ({ type: 'paragraph', content }));

  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'heading':
            return <h2 key={i}>{b.content}</h2>;
          case 'list':
            return (
              <ul key={i}>
                {(b.items || []).map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          case 'quote':
            return <blockquote key={i}><p>{b.content}</p></blockquote>;
          case 'paragraph':
            return <p key={i}>{b.content}</p>;
          default:
            return null; // unknown block types are skipped, not crashed on
        }
      })}
    </div>
  );
}
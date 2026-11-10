# Portfolio front end (React + Vite)

The front end is finished and runs on its own. Without a backend it shows the
fallback content in `src/data/content.js`, and the status panel in the hero
reports the API as unreachable. As you build each endpoint, the site switches
over to live data automatically.

## Run it

```bash
npm install
cp .env.example .env     # optional; change the backend URL if not localhost:8000
npm run dev              # http://localhost:5173
```

In development, Vite forwards anything under `/api` to your backend
(`vite.config.js`), so you don't need CORS while building.

## What to edit first

`src/data/content.js` has your name, headline, links, project fallbacks,
experience and the suggested questions in the AI bar. All of it is lorem ipsum for now. Search for `TODO` to find placeholders (email, GitHub, LinkedIn,
dates).

## API contract for your Python backend

All calls live in `src/api.js`. JSON in, JSON out. Errors may use
`{"detail": "message"}` (FastAPI style) or `{"error": "message"}`; the message
is shown to the visitor on the contact form.

| Method | Path | Response |
|---|---|---|
| GET | `/api/health` | `{ "status": "ok", "version": "1.0.0", "uptime_seconds": 1234 }` (only `status` is needed; the others are optional) |
| GET | `/api/projects` | `[{ "slug", "name", "summary", "stack": ["Python"], "links": [{ "label", "href" }] }]` |
| GET | `/api/posts` | `[{ "slug", "title", "date": "2026-10-10", "summary" }]`, newest first |
| GET | `/api/posts/{slug}` | `{ "slug", "title", "date", "summary", "body" }` or `404`. `body` is plain text; blank lines separate paragraphs |
| POST | `/api/contact` | Request `{ "name", "email", "message" }`. Return `201 { "ok": true }`, or `422` / `400` with an error message |
| POST | `/api/ask` | Request `{ "message": "...", "history": [{ "role": "user" or "assistant", "content": "..." }] }` (message up to 500 characters, history up to the last 10 messages). Return `200 { "answer": "..." }`. Use `429` for rate limiting and `5xx` when Gemini fails; the bar shows a friendly message for each |

Notes:

- The status panel calls `/api/health` every 5 seconds while the tab is visible,
  so keep that endpoint cheap (no database queries).
- If the API is on a different origin in production, build with
  `VITE_API_URL=https://your-api.example.com/api` and enable CORS for the site's
  origin on the backend. If you serve the built `dist/` and the API from the same
  origin (for example behind one reverse proxy), leave it unset.
- Client-side routing (`/writing/some-slug`) means your host must serve
  `index.html` for unknown paths. If FastAPI serves `dist/`, add a catch-all
  route that returns `index.html`.
- Validate and rate-limit `/api/contact` on the server. The form's `required`
  and length limits are only a convenience.

## Build

```bash
npm run build            # outputs dist/
npm run preview
```

// All backend communication lives here. This file is the contract between
// the React app and your Python API; see README.md for the response shapes.

const BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://portfolio-backend-cqzk.onrender.com/api'
    : '/api');

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON body (e.g. an HTML error page from a proxy).
  }

  if (!res.ok) {
    const err = new Error(extractMessage(data) || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

// Supports FastAPI ({detail: "..."} or {detail: [{msg}]}) and {error: "..."} styles.
function extractMessage(data) {
  if (!data) return null;
  if (typeof data.detail === 'string') return data.detail;
  if (Array.isArray(data.detail) && data.detail[0]?.msg) return data.detail[0].msg;
  if (typeof data.error === 'string') return data.error;
  return null;
}

// GET /api/health -> { status: "ok", version?: string, uptime_seconds?: number }
// Returns the payload plus client-measured round-trip time in milliseconds.
export async function getHealth() {
  const start = performance.now();
  const data = await request('/health');
  return { data, ms: Math.round(performance.now() - start) };
}

// GET /api/projects -> Project[]
export const getProjects = () => request('/projects');

// GET /api/posts -> PostSummary[]
export const getPosts = () => request('/posts');

// GET /api/posts/:slug -> Post
export const getPost = (slug) => request(`/posts/${encodeURIComponent(slug)}`);

// POST /api/contact  { name, email, message } -> 201 { ok: true }
export const sendContact = (payload) =>
  request('/contact', { method: 'POST', body: JSON.stringify(payload) });

// POST /api/ask  { message: string, history: [{ role: "user" | "assistant", content: string }] }
//   -> 200 { answer: string }
// Your backend calls Gemini (the API key never goes in the browser) and returns the answer.
export const askAi = ({ message, history, signal }) =>
  request('/ask', {
    method: 'POST',
    body: JSON.stringify({ message, history }),
    signal,
  });

import { API_URL } from '../constants/config';

const TIMEOUT_MS = 10000;

// Turns whatever the server sent back into one readable sentence.
function errorMessage(status, bodyText) {
  try {
    const body = JSON.parse(bodyText);
    if (typeof body === 'string') return body;
    if (body.errors && typeof body.errors === 'object') {
      const first = Object.values(body.errors).flat()[0];
      if (first) return String(first);
    }
    if (body.message) return String(body.message);
    if (body.detail) return String(body.detail);
    if (body.title) return String(body.title);
  } catch {
    if (bodyText && bodyText.length < 200) return bodyText;
  }
  if (status === 401) return 'Invalid username or password.';
  if (status === 409) return 'That username or email is already taken.';
  return `Something went wrong (HTTP ${status}).`;
}

async function post(path, payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch {
    throw new Error(`Can't reach the server at ${API_URL}. Is the backend running?`);
  } finally {
    clearTimeout(timer);
  }

  const text = await res.text();
  if (!res.ok) throw new Error(errorMessage(res.status, text));

  const data = JSON.parse(text); // { userId, username, token }
  return { token: data.token, userId: String(data.userId), username: data.username };
}

export const login = (username, password) => post('/api/Auth/login', { username, password });
export const register = (username, email, password) =>
  post('/api/Auth/register', { username, email, password });

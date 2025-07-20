//
// PUBLIC_INTERFACE
// API utility hooks for the notes app frontend to interact with backend API
//

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// PUBLIC_INTERFACE
export async function login(username, password) {
  /** Authenticate the user and return { access_token, token_type } or throw error */
  const data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);

  const resp = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data.toString()
  });
  if (!resp.ok) {
    throw new Error("Invalid login");
  }
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function register({ username, password }) {
  /** Register a new user and returns { access_token, token_type } or throws error */
  const body = { username, password };
  const resp = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.detail || "Registration failed");
  }
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function fetchNotes(token) {
  /** Fetch list of notes for the logged-in user, returns [{id, title, content}] */
  const resp = await fetch(`${API_URL}/notes/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) throw new Error("Failed to fetch notes");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function createNote(token, { title, content }) {
  /** Create a note. Returns note object */
  const resp = await fetch(`${API_URL}/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.detail || "Failed to create note");
  }
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function updateNote(token, noteId, { title, content }) {
  /** Update the note with id=noteId. Returns the updated note. */
  const resp = await fetch(`${API_URL}/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.detail || "Failed to update note");
  }
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(token, noteId) {
  /** Delete note with noteId. Returns nothing or throws error */
  const resp = await fetch(`${API_URL}/notes/${noteId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok && resp.status !== 204) throw new Error("Failed to delete note");
}

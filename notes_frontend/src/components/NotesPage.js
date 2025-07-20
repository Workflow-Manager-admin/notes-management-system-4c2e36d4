import React, { useEffect, useState } from "react";
import * as api from "../api";
import { useAuth } from "../AuthContext";

// PUBLIC_INTERFACE
function NotesPage() {
  const { token, logout, username } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // note id
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [creating, setCreating] = useState(false);

  // fetch on mount/token change
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    api.fetchNotes(token)
      .then(setNotes)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;
    setCreating(true);
    setError("");
    try {
      const note = await api.createNote(token, newNote);
      setNotes([note, ...notes]);
      setNewNote({ title: "", content: "" });
    } catch (e) {
      setError(e.message);
    }
    setCreating(false);
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;
    setError("");
    try {
      await api.deleteNote(token, noteId);
      setNotes(notes.filter(n => n.id !== noteId));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = (note) => {
    setEditing(note.id);
    setNewNote({ title: note.title, content: note.content || "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;
    setError("");
    try {
      const updated = await api.updateNote(token, editing, newNote);
      setNotes(notes => notes.map(n => n.id === editing ? updated : n));
      setEditing(null);
      setNewNote({ title: "", content: "" });
    } catch (e) {
      setError(e.message);
    }
  };

  if (!token) return null;
  return (
    <div className="notes-container">
      <header className="notes-header">
        <div>
          <span className="app-title">📝 Notes</span>
        </div>
        <nav>
          <span className="username">Hi, {username}!</span>
          <button className="btn btn-small" onClick={logout} style={{marginLeft: 16}}>
            Logout
          </button>
        </nav>
      </header>
      <div className="notes-main">
        <section className="notes-form-section">
          {editing ? (
            <form onSubmit={handleUpdate} className="note-form">
              <h3>Edit Note</h3>
              <input
                required
                placeholder="Title"
                value={newNote.title}
                onChange={e => setNewNote(n => ({ ...n, title: e.target.value }))}
              />
              <textarea
                placeholder="Content"
                value={newNote.content}
                onChange={e => setNewNote(n => ({ ...n, content: e.target.value }))}
              />
              <div className="form-actions">
                <button className="btn" type="submit">Update</button>
                <button className="btn"
                  type="button"
                  onClick={() => {setEditing(null); setNewNote({ title: "", content: "" });}}
                  style={{marginLeft: 8}}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCreate} className="note-form">
              <h3>New Note</h3>
              <input
                required
                placeholder="Title"
                value={newNote.title}
                onChange={e => setNewNote(n => ({ ...n, title: e.target.value }))}
              />
              <textarea
                placeholder="Content"
                value={newNote.content}
                onChange={e => setNewNote(n => ({ ...n, content: e.target.value }))}
              />
              <button className="btn" type="submit" disabled={creating}>Add Note</button>
            </form>
          )}
        </section>
        <section className="notes-list-section">
          <h3>Your Notes</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="form-error">{error}</p>
          ) : notes.length === 0 ? (
            <p>No notes yet. Create your first one!</p>
          ) : (
            <ul className="notes-list">
              {notes.map(note => (
                <li key={note.id} className="note-card">
                  <div className="note-header">
                    <strong>{note.title}</strong>
                  </div>
                  <div className="note-content">{note.content || <em>No content</em>}</div>
                  <div className="note-actions">
                    <button className="btn btn-small" onClick={() => handleEdit(note)}>
                      Edit
                    </button>
                    <button className="btn btn-small btn-danger" onClick={() => handleDelete(note.id)} style={{marginLeft: 8}}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default NotesPage;

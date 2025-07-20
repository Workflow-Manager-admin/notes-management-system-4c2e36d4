import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { validateUsername, validatePassword } from "../utils";

// PUBLIC_INTERFACE
function RegisterForm({ onSuccess }) {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    if (!validateUsername(username)) return setErr("Username too short (min 3 chars)");
    if (!validatePassword(password)) return setErr("Password too short (min 6 chars)");
    setLoading(true);
    try {
      await register(username, password);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (e) {
      setLoading(false);
      setErr(e.message || "Registration failed");
    }
  };

  return (
    <form className="form-container" onSubmit={handleRegister} autoComplete="off">
      <h2>Create Account</h2>
      <label>
        Username
        <input
          autoFocus
          autoComplete="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          minLength={3}
        />
      </label>
      <label>
        Password
        <input
          autoComplete="new-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </label>
      <button className="btn" type="submit" disabled={loading}>Register</button>
      {err && <div className="form-error">{err}</div>}
    </form>
  );
}

export default RegisterForm;

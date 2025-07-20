import React, { useState } from "react";
import { useAuth } from "../AuthContext";

// PUBLIC_INTERFACE
function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(username, password);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (e) {
      setLoading(false);
      setErr(e.message || "Login failed");
    }
  };

  return (
    <form className="form-container" onSubmit={handleLogin} autoComplete="off">
      <h2>Sign In</h2>
      <label>
        Username
        <input
          autoFocus
          autoComplete="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          autoComplete="current-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="btn" type="submit" disabled={loading}>Log In</button>
      {err && <div className="form-error">{err}</div>}
    </form>
  );
}

export default LoginForm;

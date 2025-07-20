import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "./api";

// PUBLIC_INTERFACE
// AuthContext: Holds global auth (JWT) state and provides login/logout/register helpers

const AuthContext = createContext();

export function useAuth() {
  /** Hook to access auth context */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    // Load initial state from localStorage
    const raw = localStorage.getItem("auth");
    if (!raw) return { token: null, username: null };
    try { return JSON.parse(raw); } catch { return { token: null, username: null }; }
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const loginUser = async (username, password) => {
    const res = await api.login(username, password);
    setAuth({ token: res.access_token, username });
  };

  const registerUser = async (username, password) => {
    const res = await api.register({ username, password });
    setAuth({ token: res.access_token, username });
  };

  const logout = () => {
    setAuth({ token: null, username: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{
      token: auth.token,
      username: auth.username,
      isAuthenticated: !!auth.token,
      login: loginUser,
      register: registerUser,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

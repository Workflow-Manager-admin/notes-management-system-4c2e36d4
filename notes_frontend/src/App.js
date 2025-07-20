import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./AuthContext";
import NotesPage from "./components/NotesPage";
import AuthLanding from "./components/AuthLanding";

// PUBLIC_INTERFACE
function AppContent() {
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <header>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>
      <main>
        {isAuthenticated ? <NotesPage /> : <AuthLanding />}
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Provide Auth context for the app
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

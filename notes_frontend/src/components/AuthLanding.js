import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// PUBLIC_INTERFACE
function AuthLanding() {
  const [mode, setMode] = useState("login");
  return (
    <section className="auth-landing">
      <div className="auth-box">
        {mode === "login" ? (
          <>
            <LoginForm />
            <p>
              Don't have an account?{" "}
              <button className="link-btn" onClick={() => setMode("register")}>Register</button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm />
            <p>
              Already have an account?{" "}
              <button className="link-btn" onClick={() => setMode("login")}>Login</button>
            </p>
          </>
        )}
      </div>
      <footer className="auth-footer">
        <small>
          Simple Notes App &copy; KAVIA
        </small>
      </footer>
    </section>
  );
}

export default AuthLanding;

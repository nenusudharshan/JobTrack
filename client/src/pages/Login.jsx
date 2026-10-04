import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login({ onLogin, onRegister }) {
  // Store the values entered in the form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store error message
  const [error, setError] = useState("");

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      // Send login request to our backend
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      // Check if login failed
      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Save JWT token in browser
      localStorage.setItem("token", data.token);

      // Tell App.jsx that login succeeded
      onLogin(data.user);
    } catch (error) {
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="login-container">
      {/* Product information */}
      <div className="login-info">
        <h1>JobTrack</h1>

        <h2>Your job search, organized.</h2>

        <p className="login-description">
          Keep track of every opportunity, monitor your progress, and stay
          organized throughout your job search.
        </p>

        <div className="feature-list">
          <div className="feature-item">
            <span>✓</span>
            <div>
              <strong>Track Applications</strong>
              <p>Keep all your applications in one place.</p>
            </div>
          </div>

          <div className="feature-item">
            <span>✓</span>
            <div>
              <strong>Monitor Progress</strong>
              <p>Track interviews, selections, rejections and more.</p>
            </div>
          </div>

          <div className="feature-item">
            <span>✓</span>
            <div>
              <strong>Stay Organized</strong>
              <p>Store job details, dates, links and notes together.</p>
            </div>
          </div>
        </div>

        <p className="login-tagline">One dashboard. Every opportunity.</p>
      </div>

      {/* Existing login card */}
      <div className="login-card">
        <h1>JobTrack</h1>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <p className="account-switch">
            Don't have an account?{" "}
            <button type="button" className="link-button" onClick={onRegister}>
              Create Account
            </button>
          </p>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
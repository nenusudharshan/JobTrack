import { useState } from "react";

function Register({ onRegisterSuccess, onBackToLogin }) {
  // Store form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Store messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send registration request to backend
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      // Registration failed
      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Registration successful
      setMessage("Account created successfully!");

      // Go back to login after short delay
      setTimeout(() => {
        onRegisterSuccess();
      }, 1000);

    } catch (error) {
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h1>JobTrack</h1>

        <h2>Create Account</h2>

        <p className="register-subtitle">
          Start organizing your job search today.
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <p className="account-switch">
          Already have an account?{" "}

          <button
            type="button"
            className="link-button"
            onClick={onBackToLogin}
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Register;
import { useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";

function App() {
  // ==========================================
  // REGISTER / LOGIN SCREEN
  // ==========================================
  const [showRegister, setShowRegister] = useState(false);

  // ==========================================
  // LOGGED-IN USER
  // ==========================================
  // Restore the user from localStorage when
  // the application starts.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ==========================================
  // CURRENT PAGE
  // ==========================================
  // Possible values:
  // "dashboard"
  // "add"
  // "edit"
  const [page, setPage] = useState("dashboard");

  // ==========================================
  // APPLICATION BEING EDITED
  // ==========================================
  const [editingApplication, setEditingApplication] =
    useState(null);

  // ==========================================
  // LOGIN
  // ==========================================
  const handleLogin = (userData) => {
    // Store logged-in user in React state
    setUser(userData);

    // Store user in browser
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    // Go to dashboard
    setPage("dashboard");
  };

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = () => {
    // Remove authentication information
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear user from React state
    setUser(null);

    // Return to login screen
    setPage("dashboard");
  };

  // ==========================================
  // EDIT APPLICATION
  // ==========================================
  const handleEdit = (application) => {
    // Store selected application
    setEditingApplication(application);

    // Open edit page
    setPage("edit");
  };

  // ==========================================
  // LOGIN / REGISTER SCREEN
  // ==========================================
  if (!user) {

    // Show registration page
    if (showRegister) {
      return (
        <Register
          onRegisterSuccess={() => {
            // After registration,
            // return to login page
            setShowRegister(false);
          }}
          onBackToLogin={() => {
            // Return to login manually
            setShowRegister(false);
          }}
        />
      );
    }

    // Show login page
    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => {
          setShowRegister(true);
        }}
      />
    );
  }

  // ==========================================
  // MAIN APPLICATION
  // ==========================================
  return (
    <div>

      {/* ================================
          NAVIGATION BAR
      ================================= */}

      <nav className="navbar">

        <h2>JobTrack</h2>

        <div>

          {/* Dashboard */}
          <button
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          {/* Add application */}
          <button
            onClick={() => setPage("add")}
          >
            + Add Application
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* ================================
          DASHBOARD
      ================================= */}

      {page === "dashboard" && (
        <Dashboard
          user={user}
          onEdit={handleEdit}
        />
      )}


      {/* ================================
          ADD APPLICATION
      ================================= */}

      {page === "add" && (
        <AddApplication
          onApplicationAdded={() => {
            setPage("dashboard");
          }}
        />
      )}


      {/* ================================
          EDIT APPLICATION
      ================================= */}

      {page === "edit" &&
        editingApplication && (
          <EditApplication
            application={editingApplication}

            onUpdated={() => {
              // Clear selected application
              setEditingApplication(null);

              // Return to dashboard
              setPage("dashboard");
            }}

            onCancel={() => {
              // Clear selected application
              setEditingApplication(null);

              // Return to dashboard
              setPage("dashboard");
            }}
          />
        )}

    </div>
  );
}

export default App;
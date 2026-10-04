import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
function Dashboard({ user, onEdit }) {
  // Store applications received from the backend
  const [applications, setApplications] = useState([]);

  // Store loading state
  const [loading, setLoading] = useState(true);

  // Store error message
  const [error, setError] = useState("");

  // Store search text
  const [search, setSearch] = useState("");

  // Store selected status filter
  const [statusFilter, setStatusFilter] = useState("All");

  // Store selected job type filter
  const [jobTypeFilter, setJobTypeFilter] = useState("All");

  // ==========================================
  // FETCH APPLICATIONS
  // ==========================================

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Get JWT token saved during login
        const token = localStorage.getItem("token");

        // Ask backend for this user's applications
        const response = await fetch(
          `${API_URL}/api/applications`,
          {
            method: "GET",
            headers: {
              // Send JWT to backend for authentication
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // If backend returns an error
        if (!response.ok) {
          setError(
            data.message || "Failed to fetch applications"
          );
          return;
        }

        // Store applications in React state
        setApplications(data);
      } catch (error) {
        setError("Unable to connect to server");
      } finally {
        // Stop loading after request finishes
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ==========================================
  // DELETE APPLICATION
  // ==========================================

  const handleDelete = async (applicationId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    // Stop if user clicks Cancel
    if (!confirmDelete) {
      return;
    }

    try {
      // Get JWT token
      const token = localStorage.getItem("token");

      // Send DELETE request to backend
      const response = await fetch(
        `${API_URL}/api/applications/${applicationId}`,
        {
          method: "DELETE",
          headers: {
            // Send JWT for authentication
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      // Check if delete failed
      if (!response.ok) {
        setError(
          data.message || "Failed to delete application"
        );
        return;
      }

      // Remove deleted application from React state
      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) =>
            application.id !== applicationId
        )
      );
    } catch (error) {
      setError("Unable to connect to server");
    }
  };

  // ==========================================
  // DASHBOARD STATISTICS
  // ==========================================

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length;

  const selected = applications.filter(
    (application) =>
      application.status === "Selected"
  ).length;

  // ==========================================
  // SEARCH AND FILTER
  // ==========================================

  const filteredApplications = applications.filter(
    (application) => {
      const searchText = search.toLowerCase();

      // Search company, role or location
      const matchesSearch =
        (application.company || "")
          .toLowerCase()
          .includes(searchText) ||

        (application.role || "")
          .toLowerCase()
          .includes(searchText) ||

        (application.location || "")
          .toLowerCase()
          .includes(searchText);

      // Check status filter
      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      // Check job type filter
      const matchesJobType =
        jobTypeFilter === "All" ||
        application.job_type === jobTypeFilter;

      // Application must satisfy all conditions
      return (
        matchesSearch &&
        matchesStatus &&
        matchesJobType
      );
    }
  );

  // ==========================================
  // STATUS BADGE CLASS
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "status-applied";

      case "Online Assessment":
        return "status-assessment";

      case "Interview":
        return "status-interview";

      case "Selected":
        return "status-selected";

      case "Rejected":
        return "status-rejected";

      case "Withdrawn":
        return "status-withdrawn";

      default:
        return "";
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const dateOnly = date.substring(0, 10);

    const [year, month, day] = dateOnly.split("-");

    return `${day}-${month}-${year}`;
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="dashboard-container">

      {/* Dashboard heading */}
      <h1>JobTrack</h1>

      <h2>
        Welcome, {user?.name}!
      </h2>

      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{totalApplications}</p>
        </div>

        <div className="stat-card">
          <h3>Interviews</h3>
          <p>{interviews}</p>
        </div>

        <div className="stat-card">
          <h3>Selected</h3>
          <p>{selected}</p>
        </div>

      </div>

      {/* ======================================
          APPLICATIONS
      ====================================== */}

      <h2>My Applications</h2>

      {/* Search and filters */}
      <div className="filter-container">

        {/* Search */}
        <input
          type="text"
          placeholder="Search company, role or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">
            All Statuses
          </option>

          <option value="Applied">
            Applied
          </option>

          <option value="Online Assessment">
            Online Assessment
          </option>

          <option value="Interview">
            Interview
          </option>

          <option value="Selected">
            Selected
          </option>

          <option value="Rejected">
            Rejected
          </option>

          <option value="Withdrawn">
            Withdrawn
          </option>
        </select>

        {/* Job type filter */}
        <select
          value={jobTypeFilter}
          onChange={(e) =>
            setJobTypeFilter(e.target.value)
          }
        >
          <option value="All">
            All Job Types
          </option>

          <option value="Internship">
            Internship
          </option>

          <option value="Full-time">
            Full-time
          </option>

          <option value="Part-time">
            Part-time
          </option>

          <option value="Contract">
            Contract
          </option>
        </select>

      </div>

      {/* ======================================
          LOADING
      ====================================== */}

      {loading && (
        <p>Loading applications...</p>
      )}

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {/* ======================================
          NO APPLICATIONS
      ====================================== */}

      {!loading &&
        !error &&
        applications.length === 0 && (
          <div className="empty-state">
            <h3>No applications yet</h3>
            <p>
              Start tracking your job applications
              by adding your first opportunity.
            </p>
          </div>
        )}

      {/* ======================================
          NO SEARCH RESULTS
      ====================================== */}

      {!loading &&
        !error &&
        applications.length > 0 &&
        filteredApplications.length === 0 && (
          <div className="empty-state">
            <h3>No matching applications</h3>
            <p>
              Try changing your search or filters.
            </p>
          </div>
        )}

      {/* ======================================
          APPLICATION CARDS
      ====================================== */}

      <div className="applications-container">

        {filteredApplications.map(
          (application) => (

            <div
              className="application-card"
              key={application.id}
            >

              {/* Company */}
              <div className="application-header">
                <div>
                  <h3>
                    {application.company}
                  </h3>

                  <p className="application-role">
                    {application.role}
                  </p>
                </div>

                {/* Status badge */}
                <span
                  className={`status-badge ${getStatusClass(
                    application.status
                  )}`}
                >
                  {application.status}
                </span>
              </div>

              {/* Application details */}
              <div className="application-details">

                <p>
                  <strong>Location:</strong>{" "}
                  {application.location || "N/A"}
                </p>

                <p>
                  <strong>Job Type:</strong>{" "}
                  {application.job_type || "N/A"}
                </p>

                <p>
                  <strong>Applied:</strong>{" "}
                  {formatDate(
                    application.application_date
                  )}
                </p>

              </div>

              {/* Job URL */}
              {application.job_url && (
                <a
                  href={application.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="job-link"
                >
                  View Job Posting ↗
                </a>
              )}

              {/* Buttons */}
              <div className="application-actions">

                {/* EDIT BUTTON */}
                <button
                  onClick={() =>
                    onEdit(application)
                  }
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() =>
                    handleDelete(application.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Dashboard;
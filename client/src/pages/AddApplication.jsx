import { useState } from "react";

function AddApplication({ onApplicationAdded }) {

    // Store all form values
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        location: "",
        job_type: "Internship",
        status: "Applied",
        application_date: "",
        job_url: "",
        notes: "",
    });

    // Store success/error messages
    const [message, setMessage] = useState("");

    // Handle changes in any input field
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit application to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            // Get JWT token from browser
            const token = localStorage.getItem("token");

            // Send application data to backend
            const response = await fetch(
                "http://localhost:5000/api/applications",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        // Send logged-in user's JWT
                        Authorization: `Bearer ${token}`,
                    },

                    // Convert JavaScript object into JSON
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            // Backend returned an error
            if (!response.ok) {
                setMessage(data.message || "Failed to add application");
                return;
            }

            // Show success message
            setMessage("Application added successfully!");

            // Clear the form
            setFormData({
                company: "",
                role: "",
                location: "",
                job_type: "Internship",
                status: "Applied",
                application_date: "",
                job_url: "",
                notes: "",
            });

            // Tell App.jsx that a new application was added
            if (onApplicationAdded) {
                onApplicationAdded();
            }

        } catch (error) {
            setMessage("Unable to connect to server");
        }
    };

    return (
        <div className="add-application-container">

            <div className="add-application-card">

                <h2>Add Job Application</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="role"
                        placeholder="Job Role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                    />

                    <select
                        name="job_type"
                        value={formData.job_type}
                        onChange={handleChange}
                    >
                        <option value="Internship">Internship</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                    </select>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Online Assessment">
                            Online Assessment
                        </option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Withdrawn">Withdrawn</option>
                    </select>

                    <input
                        type="date"
                        name="application_date"
                        value={formData.application_date}
                        onChange={handleChange}
                    />

                    <input
                        type="url"
                        name="job_url"
                        placeholder="Job URL"
                        value={formData.job_url}
                        onChange={handleChange}
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                    />

                    <button type="submit">
                        Add Application
                    </button>

                </form>

                {message && (
                    <p className="form-message">
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}

export default AddApplication;
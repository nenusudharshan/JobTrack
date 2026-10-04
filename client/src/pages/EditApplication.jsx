import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
function EditApplication({ application, onUpdated, onCancel }) {

    // Store the application values in the form
    const [formData, setFormData] = useState({
        company: application.company || "",
        role: application.role || "",
        location: application.location || "",
        job_type: application.job_type || "Internship",
        status: application.status || "Applied",
        application_date: application.application_date
            ? application.application_date.substring(0, 10)
            : "",
        job_url: application.job_url || "",
        notes: application.notes || "",
    });

    const [message, setMessage] = useState("");

    // Update the corresponding field when user types
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Send updated application to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/applications/${application.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",

                        // Send JWT for authentication
                        Authorization: `Bearer ${token}`,
                    },

                    // Send updated application data
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.message || "Failed to update application"
                );
                return;
            }

            // Tell Dashboard that update succeeded
            onUpdated();

        } catch (error) {
            setMessage("Unable to connect to server");
        }
    };

    return (
        <div className="add-application-container">

            <div className="add-application-card">

                <h2>Edit Application</h2>

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
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
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

export default EditApplication;
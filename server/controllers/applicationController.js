const db = require("../config/db");

// ==========================================
// GET ALL APPLICATIONS
// ==========================================
const getApplications = (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT *
        FROM applications
        WHERE user_id = ?
        ORDER BY application_date DESC
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching applications:", err.message);

            return res.status(500).json({
                message: "Failed to fetch applications",
            });
        }

        res.json(results);
    });
};


// ==========================================
// GET ONE APPLICATION
// ==========================================
const getApplication = (req, res) => {
    const userId = req.user.id;
    const applicationId = req.params.id;

    const sql = `
        SELECT *
        FROM applications
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [applicationId, userId],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to fetch application",
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "Application not found",
                });
            }

            res.json(results[0]);
        }
    );
};


// ==========================================
// CREATE APPLICATION
// ==========================================
const createApplication = (req, res) => {
    const userId = req.user.id;

    const {
        company,
        role,
        location,
        job_type,
        status,
        application_date,
        job_url,
        notes,
    } = req.body;

    if (!company || !role) {
        return res.status(400).json({
            message: "Company and role are required",
        });
    }

    const sql = `
        INSERT INTO applications
        (
            user_id,
            company,
            role,
            location,
            job_type,
            status,
            application_date,
            job_url,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        userId,
        company,
        role,
        location || null,
        job_type || null,
        status || "Applied",
        application_date || null,
        job_url || null,
        notes || null,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error creating application:", err.message);

            return res.status(500).json({
                message: "Failed to create application",
            });
        }

        res.status(201).json({
            message: "Application created successfully",
            applicationId: result.insertId,
        });
    });
};


// ==========================================
// UPDATE APPLICATION
// ==========================================
const updateApplication = (req, res) => {
    const userId = req.user.id;
    const applicationId = req.params.id;

    const {
        company,
        role,
        location,
        job_type,
        status,
        application_date,
        job_url,
        notes,
    } = req.body;

    const sql = `
        UPDATE applications
        SET
            company = ?,
            role = ?,
            location = ?,
            job_type = ?,
            status = ?,
            application_date = ?,
            job_url = ?,
            notes = ?
        WHERE id = ? AND user_id = ?
    `;

    const values = [
        company,
        role,
        location || null,
        job_type || null,
        status,
        application_date || null,
        job_url || null,
        notes || null,
        applicationId,
        userId,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to update application",
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Application not found",
            });
        }

        res.json({
            message: "Application updated successfully",
        });
    });
};


// ==========================================
// DELETE APPLICATION
// ==========================================
const deleteApplication = (req, res) => {

    // Get application ID from the URL
    const applicationId = req.params.id;

    // Delete only the application that belongs
    // to the currently logged-in user
    const query = `
        DELETE FROM applications
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        query,
        [applicationId, req.user.id],
        (err, result) => {

            // Database error
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to delete application",
                });
            }

            // Application ID was not found
            // or does not belong to this user
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Application not found",
                });
            }

            // Delete successful
            res.json({
                message: "Application deleted successfully",
            });
        }
    );
};


module.exports = {
    getApplications,
    getApplication,
    createApplication,
    updateApplication,
    deleteApplication,
};
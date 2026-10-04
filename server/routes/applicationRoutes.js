const express = require("express");

const {
    getApplications,
    getApplication,
    createApplication,
    updateApplication,
    deleteApplication,
} = require("../controllers/applicationController");

const router = express.Router();

// Get all applications
router.get("/", getApplications);

// Get one application
router.get("/:id", getApplication);

// Create application
router.post("/", createApplication);

// Update application
router.put("/:id", updateApplication);

// Delete an application
router.delete("/:id",  deleteApplication);

module.exports = router;
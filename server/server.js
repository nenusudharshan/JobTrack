const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const protect = require("./middleware/authMiddleware");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "JobTrack API is running"
    });
});     

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Authentication API routes
app.use("/api/auth", authRoutes);

// Protected application APIs
app.use(
    "/api/applications",
    protect,
    applicationRoutes
);


db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    
    console.log("Database connected successfully");
    connection.release();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});


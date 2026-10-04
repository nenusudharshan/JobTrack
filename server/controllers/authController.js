const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==============================
// REGISTER USER
// ==============================
const register = async (req, res) => {
    try {
        // Get user information sent from the frontend
        const { name, email, password } = req.body || {};

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        // Check whether the email already exists
        db.query(
            "SELECT id FROM users WHERE email = ?",
            [email],
            async (err, results) => {
                if (err) {
                    return res.status(500).json({
                        message: "Database error",
                    });
                }

                if (results.length > 0) {
                    return res.status(409).json({
                        message: "Email already registered",
                    });
                }

                // Hash the password before storing it
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert the new user
                db.query(
                    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                    [name, email, hashedPassword],
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                message: "Failed to register user",
                            });
                        }

                        res.status(201).json({
                            message: "User registered successfully",
                            userId: result.insertId,
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};


// ==============================
// LOGIN USER
// ==============================
const login = (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    // Find user by email
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error",
                });
            }

            // User not found
            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }

            const user = results[0];

            // Compare entered password with hashed password
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }

            // Create JWT token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            );

            // Send token to frontend
            res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
    );
};

module.exports = {
    register,
    login,
};
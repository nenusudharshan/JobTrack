const db = require("../config/db");

const getUsers = (req, res) => {
    db.query(
        "SELECT id, name, email, created_at FROM users",
        (err, results) => {
            if (err) {
                console.error("Error fetching users:", err.message);

                return res.status(500).json({
                    message: "Failed to fetch users"
                });
            }

            res.json(results);
        }
    );
};



const createUser = (req, res) => {
    const { name, email, password } = req.body;

    const sql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("Error creating user:", err.message);

            return res.status(500).json({
                message: "Failed to create user"
            });
        }

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId
        });
    });
};
module.exports = {
    getUsers, createUser
};  
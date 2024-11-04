const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        let user = req.body;

        if (user.name && user.email && user.password) {
            const result = await registerUser(user);
            return res.status(200).json({
                message: "User registered successfully",
                user: result
            });
        } else {
            return res.status(400).json({ message: "Missing required fields" });
        }
    } catch (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

});

router.post("/login", async (req, res) => {
    try {
        console.log("Login request received:", req.body);
        let user = req.body;

        if (user.email && user.password) {
            const result = await loginUser(user);
            if (result.error) {
                return res.status(400).json({ message: result.error });
            }
            return res.status(200).json({
                message: "User logged in successfully",
                token: result.token,
                user: result.user,
                isAdmin: result.user.isAdmin,
            });
        } else {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }
    } catch (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

});

module.exports = router;
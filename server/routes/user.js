const express = require("express");
const passport = require("passport");
const User = require("../models/userSchema.js");

const router = express.Router();

// ✅ Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized! Please log in." });
};

// ✅ Handle User Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, mobile, password, photoUrl } = req.body;

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // ✅ Create a new user instance
        const newUser = new User({ name, email, mobile, photoUrl });

        // ✅ Register user with Passport (automatically hashes password)
        User.register(newUser, password, (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Registration failed!", error: err.message });
            }

            // ✅ Authenticate user and start session
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Login failed after signup!", error: err.message });
                }
                req.session.user = user;  // ✅ Store user info in session
                res.status(201).json({ message: "User registered & logged in!", user });
            });
        });

        console.log(newUser);
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// ✅ Handle User Login with Session
router.post("/login", passport.authenticate("local"), (req, res) => {
    req.session.user = req.user; // ✅ Store user in session
    res.status(200).json({ message: "Login successful!", user: req.user });
});

// ✅ Handle Logout (Destroy Session)
router.post("/logout", async (req, res) => {
    try {
        await req.logout();
        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: "Failed to clear session!" });
            res.status(200).json({ message: "Logout successful!" });
        });
    } catch (error) {
        res.status(500).json({ message: "Logout error!", error: error.message });
    }
});

// ✅ Check if User is Logged In (Session Check)
router.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ user: req.session.user });
    } else {
        return res.status(401).json({ message: "Not logged in" });
    }
});

// ✅ Handle Profile Update (Requires Authentication)
router.put("/update/:id", isAuthenticated, (req, res) => {
    const { name, email, mobile, photoUrl } = req.body;
    const userId = req.user._id.toString(); // Get authenticated user's ID

    if (userId !== req.params.id) {
        return res.status(403).json({ message: "Access Denied! Cannot update other users." });
    }

    User.findByIdAndUpdate(
        userId,
        { name, email, mobile, photoUrl },
        { new: true }
    )
    .then(updatedUser => {
        if (!updatedUser) return res.status(404).json({ message: "User not found!" });
        req.session.user = updatedUser;  // ✅ Update session with new user info
        res.status(200).json({ message: "Profile updated successfully!", user: updatedUser });
    })
    .catch(error => res.status(500).json({ success: false, message: "Server Error", error: error.message }));
});

module.exports = router;
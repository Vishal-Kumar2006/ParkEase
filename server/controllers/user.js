const User = require("../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const { setUser, getUser } = require("../service/auth");

// Sign UP Handler
async function handleSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Create session for the new user
    const sessionId = uuidv4();
    setUser(sessionId, newUser); // Fix: Pass newUser instead of user
    res.cookie("uid", sessionId, { httpOnly: true, maxAge: 86400000 }); // Cookie valid for 1 day

    res.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Login Handler
async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create session for logged-in user
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId, { httpOnly: true, maxAge: 86400000 }); // Cookie valid for 1 day

    res.json({ message: "User Logged in Successfully" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get Current User Handler
async function getCurrentUser(req, res) {
  try {
    const sessionId = req.cookies.uid;
    if (!sessionId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const user = getUser(sessionId); // Retrieve user from session storage
    if (!user) {
      return res.status(401).json({ message: "Session expired, please log in again" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { handleSignUp, handleLogin, getCurrentUser };
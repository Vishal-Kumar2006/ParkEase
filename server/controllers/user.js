const User = require("../models/user");
const bcrypt = require("bcrypt");

// ✅ Sign Up Handler
async function handleSignUp(req, res) {
  try {
    const { name, email, password, photo } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      photo:
        photo ||
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    });

    console.log(newUser);

    // ✅ Store user in session
    req.session.user = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      photo: newUser.photo,
    };

    // ✅ Explicitly save session and wait
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error("Session Save Error:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log("Session Data after save:", req.session);

    // Send response after session is fully saved
    res.json({ message: "User created successfully", user: req.session.user });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ Login Handler
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

    // ✅ Store user in session
    req.session.user = { id: user._id };

    res.json({
      message: "User Logged in Successfully",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleLogout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout Error:", err);
        return res
          .status(500)
          .json({ message: "Logout failed. Please try again." });
      }
      res.clearCookie("connect.sid"); // Remove session cookie
      res.json({ message: "Logged out successfully" });
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ Get Current Logged-in User
// Get Current Logged-in User
async function getCurrentUser(req, res) {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const user = await User.findById(req.session.user.id).select("-password");

    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// ✅ Get User by ID (for parking feature)
async function getParkingUser(req, res) {
  try {
    const userId = req.params.id; // Extract user ID from URL params

    // Find user in database
    const user = await User.findById(userId);

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data in response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateUserParking(req, res) {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    console.log("Updating User ID:", id);
    console.log("Received Data:", updatedFields);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated User:", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
}

module.exports = {
  handleSignUp,
  handleLogin,
  handleLogout,
  getCurrentUser,
  getParkingUser,
  updateUserParking,
};

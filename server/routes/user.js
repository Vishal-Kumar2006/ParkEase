const express = require("express");
const {
  handleSignUp,
  handleLogin,
  updateUserParking,
  handleLogout,
  getCurrentUser,
  getParkingUser,
} = require("../controllers/user.js");
const {
  checkNotLoggedIn,
  restrictedToLoggedInUserOnly,
} = require("../middleware/auth.js");

const router = express.Router();

router.get("/", restrictedToLoggedInUserOnly, getCurrentUser);
router.get("/:id", restrictedToLoggedInUserOnly, getParkingUser);
router.put("/:id/update", restrictedToLoggedInUserOnly, updateUserParking);

router.post("/signup", checkNotLoggedIn, handleSignUp);
router.post("/login", checkNotLoggedIn, handleLogin);
router.post("/logout", restrictedToLoggedInUserOnly, handleLogout);

module.exports = router;

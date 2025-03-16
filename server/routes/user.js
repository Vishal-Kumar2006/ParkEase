const express = require('express');
const {handleSignUp, handleLogin, updateUserParking, handleLogout, getCurrentUser, getParkingUser} = require("../controllers/user");
const {checkNotLoggedIn, restrictedToLoggedInUserOnly} = require("../middleware/auth");

const router = express.Router();


router.get("/", getCurrentUser);
router.get("/:id", getParkingUser);
router.put("/:id/update", updateUserParking);

router.post("/signup", checkNotLoggedIn, handleSignUp);
router.post("/login", checkNotLoggedIn, handleLogin);
router.post("/logout", restrictedToLoggedInUserOnly, handleLogout);

module.exports = router;
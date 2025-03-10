const express = require('express');
const {handleSignUp, handleLogin, getCurrentUser} = require("../controllers/user");

const router = express.Router();


router.get("/", getCurrentUser);
router.post("/signup", handleSignUp);
router.post("/login", handleLogin);

module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
    res.json({ title: "Welcome to ParkEase", content: "Find parking spots easily!" });
});

router.get("/about", (req, res) => {
    res.json({ title: "About ParkEase", content: "We make parking easy for everyone!" });
});

router.get("/contact", (req, res) => {
    res.json({ title: "Contact Us", content: "Email us at support@parkease.com" });
});

module.exports = router;

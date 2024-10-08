const express = require('express');

const router = express.Router();
const env = require("dotenv");

env.config();

router.get('/', async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});

module.exports = router;

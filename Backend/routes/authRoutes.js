const express = require("express");
const handleLogin = require("../controllers/auth/login.controller");
const handleSignUp = require("../controllers/auth/signup.controller");

const router = express.Router();

router.post("/login", express.json(), handleLogin);
router.post("/signup", express.json(), handleSignUp);

module.exports = router;

const express = require("express");
const handleLogin = require("../controllers/auth/login.controller");
const handleSignUp = require("../controllers/auth/signup.controller");
const middleware = require("../middlewares/middleware");
const checkLoggedIn = require("../controllers/auth/checkLoggedIn.controller");

const router = express.Router();

router.post("/login", express.json(), handleLogin);
router.post("/signup", express.json(), handleSignUp);
router.get("/check", (req, res, next) => middleware("admin|user", req, res, next), checkLoggedIn);

module.exports = router;

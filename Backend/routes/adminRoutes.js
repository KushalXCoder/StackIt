const express = require("express");
const handleChangeRole = require("../controllers/admin/handleChangeRole");

const adminRouter = express.Router();

adminRouter.put("/change-role", express.json(), handleChangeRole);

module.exports = adminRouter;

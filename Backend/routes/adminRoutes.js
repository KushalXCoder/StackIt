const express = require("express");
const handleChangeRole = require("../controllers/admin/handleChangeRole");
const handleDelete = require("../controllers/admin/handleDelete");

const adminRouter = express.Router();

adminRouter.put("/change-role", express.json(), handleChangeRole);
adminRouter.delete("/delete", express.json(), handleDelete);

module.exports = adminRouter;

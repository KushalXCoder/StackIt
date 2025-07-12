// @ts-check

const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		required: true,
		unique: true,
		type: String,
	},
});

const Users = mongoose.model("users", UsersSchema, "users");

module.exports = Users;

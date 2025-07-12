const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["guest", "user", "admin"],
			default: "guest",
		},
		notificationsCount: {
			type: number,
			default: 0,
		},
		profilePictureUrl: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;

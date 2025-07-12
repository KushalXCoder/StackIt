const mongoose = require("mongoose");
const User = require("./user.schema");
const Answer = require("./answer.schema");

const commentSchema = new mongoose.Schema(
	{
		postedBy: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		answerId: {
			type: mongoose.Schema.ObjectId,
			ref: "Answer",
			required: true,
		},
		mentions: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
		content: {
			type: String,
			required: true,
		},
		imagesUrl: [
			{
				type: String,
				required: false,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

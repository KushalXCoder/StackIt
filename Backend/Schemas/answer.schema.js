const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
	{
		questionId: {
			type: mongoose.Schema.ObjectId,
			ref: "Question",
			required: true,
		},
		answeredBy: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		upvote: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
		downvote: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
		content: {
			type: String,
			required: true,
		},
		mentions: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		],
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

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;

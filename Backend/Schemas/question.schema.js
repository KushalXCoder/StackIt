const mongoose = require("mongoose");
const User = require("./user.schema");
const Answer = require("./answer.schema");

const questionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		askedBy: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		acceptedAnswer: {
			type: mongoose.Schema.ObjectId,
			ref: "Answer",
		},
		tags: [
			{
				type: String,
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

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

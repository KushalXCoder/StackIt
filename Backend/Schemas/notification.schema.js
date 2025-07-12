const mongoose = require("mongoose");
const User = require("./user.schema");
const Answer = require("./answer.schema");
const Question = require("./question.schema");

const notificationSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		notificationType: {
			type: String,
			enum: ["AnsweredYourQuestion", "CommentedOnYourAnswer", "MentionedYou", "AdminAction"],
		},
		content: {
			type: String,
			required: true,
		},
		questionId: {
			type: mongoose.Schema.ObjectId,
			ref: "Question",
			required: true,
		},
		answerId: {
			type: mongoose.Schema.ObjectId,
			ref: "Answer",
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

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;

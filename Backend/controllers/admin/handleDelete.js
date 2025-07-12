// @ts-check

const Answer = require("../../Schemas/answer.schema");
const Comment = require("../../Schemas/comment.schema");
const Notification = require("../../Schemas/notification.schema");
const Question = require("../../Schemas/question.schema");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function handleDelete(req, res) {
	try {
		if (!req.body) {
			return res.status(404).json({
				status: "error",
				data: "Request body missing!",
			});
		}

		const validActions = ["QUESTION", "ANSWER", "COMMENT"];

		const { action, questionId, answerId, commentId } = req.body;

		if (!action || typeof action !== "string") {
			return res.status(404).json({
				status: "error",
				data: "Missing action",
			});
		}

		if (!validActions.includes(action.toUpperCase())) {
			return res.status(400).json({
				status: "error",
				data: "Invalid Action",
			});
		}

		if (
			action.toUpperCase() === validActions[0] &&
			(!questionId || typeof questionId !== "string")
		) {
			return res.status(404).json({
				status: "error",
				data: "questionId missing",
			});
		}

		if (
			action.toUpperCase() === validActions[1] &&
			(!answerId || typeof answerId !== "string")
		) {
			return res.status(404).json({
				status: "error",
				data: "answerId missing",
			});
		}

		if (
			action.toUpperCase() === validActions[2] &&
			(!commentId || typeof commentId !== "string")
		) {
			return res.status(404).json({
				status: "error",
				data: "commentId missing",
			});
		}

		if (action.toUpperCase() === validActions[0]) {
			// delete a question
			const deletedQuestion = await Question.findByIdAndDelete(questionId);
			if (!deletedQuestion) {
				return res.status(500).json({
					status: "error",
					data: "Failed to delete the question",
				});
			}

			await Notification.insertOne({
				userId: deletedQuestion.askedBy,
				content: `Admin just deleted your question`,
				questionId: deletedQuestion._id,
				notificationType: "AdminAction",
			});

			return res.status(200).json({
				status: "success",
				data: "Successfully deleted the question",
			});
		}

		if (action.toUpperCase() === validActions[1]) {
			// delete answer
			const deletedAnswer = await Answer.findByIdAndDelete(answerId);
			if (!deletedAnswer) {
				return res.status(500).json({
					status: "error",
					data: "Failed to delete the answer",
				});
			}

			await Notification.insertOne({
				userId: deletedAnswer.answeredBy,
				content: `Admin just deleted your answer`,
				questionId: deletedAnswer._id,
				notificationType: "AdminAction",
			});

			return res.status(200).json({
				status: "success",
				data: "Successfully deleted the answer",
			});
		}

		if (action.toUpperCase() === validActions[2]) {
			// delete comment
			const deletedComment = await Comment.findByIdAndDelete(commentId);
			if (!deletedComment) {
				return res.status(500).json({
					status: "error",
					data: "Failed to delete the comment",
				});
			}

			await Notification.insertOne({
				userId: deletedComment.postedBy,
				content: `Admin just deleted your comment`,
				questionId: deletedComment._id,
				notificationType: "AdminAction",
			});

			return res.status(200).json({
				status: "success",
				data: "Successfully deleted the comment",
			});
		}

		return res.status(502).json({
			status: "error",
			data: "Not implemented the action yet",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: $error`);
		return res.status(500).json({
			status: "error",
			data: "Unknown Error Occurred",
		});
	}
}

module.exports = handleDelete;

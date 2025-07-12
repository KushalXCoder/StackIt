// @ts-check

const Answer = require("../../Schemas/answer.schema");
const Comment = require("../../Schemas/comment.schema");
const Notification = require("../../Schemas/notification.schema");
const User = require("../../Schemas/user.schema");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function createComment(req, res) {
	try {
		if (!req.body) {
			return res.status(404).json({
				status: "error",
				data: "Could not find request body",
			});
		}

		const { answerId, content, mentions, images } = req.body;

		if (
			!answerId ||
			typeof answerId !== "string" ||
			!content ||
			typeof content !== "string" ||
			!mentions ||
			!Array.isArray(mentions) ||
			mentions.some((ele) => typeof ele !== "string") ||
			!Array.isArray(images) ||
			images.some((ele) => typeof ele !== "string")
		) {
			return res.status(400).json({
				status: "error",
				data: "Invalid request",
			});
		}

		const answer = await Answer.findById(answerId);
		if (!answer) {
			return res.status(404).json({
				status: "error",
				data: "No answer found with given id",
			});
		}

		const createdComment = await Comment.insertOne({
			content,
			// @ts-ignore
			postedBy: req.user._id,
			answerId,
			mentions,
			imagesUrl: images,
		});

		const notifications = [];

		for (let mention of mentions) {
			const userExists = await User.findById(mention);
			if (userExists) {
				notifications.push({
					userId: mention,
					content: `${mention} has mentioned you in their comment!`,
					notificationType: "MentionedYou",
				});
			}
		}

		await Notification.insertMany([
			...notifications,
			{
				userId: answer.answeredBy,
				// @ts-ignore
				content: `${req.user._id} just commented on your answer!`,
				notificationType: "CommentedOnYourAnswer",
				answerId,
			},
		]);

		if (!createdComment) {
			return res.status(500).json({
				status: "error",
				data: "Failed to create a new comment",
			});
		}

		return res.status(200).json({
			status: "success",
			data: "Added a new comment",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: $error`);
		return res.status(500).json({
			status: "error",
			data: "Unknown Error Occurred",
		});
	}
}

module.exports = createComment;

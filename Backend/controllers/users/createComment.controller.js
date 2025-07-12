// @ts-check

const Comment = require("../../Schemas/comment.schema");

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

		const { userId, answerId, content, mentions, images } = req.body;

		if (
			!userId ||
			typeof userId !== "string" ||
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

		const createdComment = await Comment.insertOne({
			content,
			postedBy: userId,
			answerId,
			mentions,
			imagesUrl: images,
		});

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

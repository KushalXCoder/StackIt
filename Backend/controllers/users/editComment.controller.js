// @ts-check

const Comment = require("../../Schemas/comment.schema");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function editComment(req, res) {
	try {
		if (!req.body) {
			return res.status(404).json({
				status: "error",
				data: "Could not find request body",
			});
		}

		const { commentId, content, mentions, images } = req.body;

		if (
			!commentId ||
			typeof commentId !== "string" ||
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

		const user = await Comment.findById(commentId);
		// @ts-ignore
		if (!user || user._id !== req.user._id) {
			return res.status(401).json({
				status: "error",
				data: "Only owner can edit!",
			});
		}

		const editedComment = await Comment.findByIdAndUpdate(commentId, {
			content,
			mentions,
			imagesUrl: images,
		});

		if (!editedComment) {
			return res.status(500).json({
				status: "error",
				data: "Failed to create edit the comment",
			});
		}

		return res.status(200).json({
			status: "success",
			data: "Edited the comment",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: $error`);
		return res.status(500).json({
			status: "error",
			data: "Unknown Error Occurred",
		});
	}
}

module.exports = editComment;

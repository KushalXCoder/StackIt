// @ts-check

const Answer = require("../../Schemas/answer.schema");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function editAnswer(req, res) {
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

		const user = await Answer.findById(answerId);
		// @ts-ignore
		if (!user || user._id !== req.user._id) {
			return res.status(401).json({
				status: "error",
				data: "Only owner can edit!",
			});
		}

		const updatedAnswer = await Answer.findByIdAndUpdate(answerId, {
			...(content ? { content } : {}),
			...(mentions ? { mentions } : {}),
			...(images ? { images } : {}),
		});

		if (!updatedAnswer) {
			return res.status(500).json({
				status: "error",
				data: "Failed to edit answer",
			});
		}

		return res.status(200).json({
			status: "success",
			data: "Edited the answer",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: $error`);
		return res.status(500).json({
			status: "error",
			data: "Unknown Error Occurred",
		});
	}
}

module.exports = editAnswer;

// @ts-check

const Answer = require("../../Schemas/answer.schema");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function createAnswer(req, res) {
	try {
		if (!req.body) {
			return res.status(404).json({
				status: "error",
				data: "Could not find request body",
			});
		}

		const { userId, questionId, content, mentions, images } = req.body;

		if (
			!userId ||
			typeof userId !== "string" ||
			!questionId ||
			typeof questionId !== "string" ||
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

		const createdAnswer = await Answer.insertOne({
			content,
			answeredBy: userId,
			mentions,
			imagesUrl: images,
		});

		if (!createdAnswer) {
			return res.status(500).json({
				status: "error",
				data: "Failed to create a new answer",
			});
		}

		return res.status(200).json({
			status: "success",
			data: "Added a new answer",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: $error`);
		return res.status(500).json({
			status: "error",
			data: "Unknown Error Occurred",
		});
	}
}

module.exports = createAnswer;

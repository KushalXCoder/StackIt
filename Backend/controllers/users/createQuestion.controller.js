// @ts-check

const Question = require("../../Schemas/question.schema");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function createQuestion(req, res) {
	try {
		if (!req.body) {
			return res.status(404).json({
				status: "error",
				data: "Could not find request body",
			});
		}

		const { userId, title, content, tags, images } = req.body;

		if (
			!userId ||
			typeof userId !== "string" ||
			!title ||
			typeof title !== "string" ||
			!content ||
			typeof content !== "string" ||
			!tags ||
			!Array.isArray(tags) ||
			tags.some((ele) => typeof ele !== "string") ||
			!Array.isArray(images) ||
			images.some((ele) => typeof ele !== "string")
		) {
			return res.status(400).json({
				status: "error",
				data: "Invalid request",
			});
		}

		const createdQuestion = await Question.insertOne({
			title,
			content,
			askedBy: userId,
			tags,
			imagesUrl: images,
		});

		if (!createdQuestion) {
			return res.status(500).json({
				status: "error",
				data: "Failed to create a new question",
			});
		}

		return res.status(200).json({
			status: "success",
			data: "Added a new question",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: $error`);
		return res.status(500).json({
			status: "error",
			data: "Unknown Error Occurred",
		});
	}
}

module.exports = createQuestion;

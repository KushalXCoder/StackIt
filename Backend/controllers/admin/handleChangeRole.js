// @ts-check

const Users = require("../../Schemas/user.schema");
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function handleChangeRole(req, res) {
	try {
		if (!req.body) {
			return res.status(404).json({
				status: "error",
				data: "Request body missing!",
			});
		}

		const { role, userId } = req.body;

		if (
			!role ||
			!userId ||
			typeof role !== "string" ||
			typeof userId !== "string" ||
			!["ADMIN", "USER"].includes(role.toUpperCase())
		) {
			return res.status(400).json({
				status: "error",
				data: "Invalid role and userId",
			});
		}

		const validUserId = await Users.findById(userId);
		if (!validUserId || !validUserId.username) {
			return res.status(404).json({
				status: "error",
				data: "Could not find given user",
			});
		}

		if (validUserId.role.toUpperCase() === role.toUpperCase()) {
			return res.status(400).json({
				status: "error",
				data: "Cannot set the role to what it is already",
			});
		}

		const roleUpdated = await Users.updateOne(
			{ username: validUserId.username },
			{ role: role.toUpperCase() }
		);
		if (!roleUpdated.acknowledged) {
			return res.status(500).json({
				status: "error",
				data: "Could not update user role",
			});
		}

		return res.status(200).json({
			status: "error",
			data: "Updated user role successfully",
		});
	} catch (error) {
		console.error(`Error in ${req.originalUrl}: $error`);
		return res.status(500).json({
			status: "error",
			data: "Unknown Error Occurred",
		});
	}
}

module.exports = handleChangeRole;

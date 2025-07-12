// @ts-check

const decrypt = require("../Utils/decrypt");
const Users = require("../Schemas/user.schema");

/**
 *
 * @param {'admin' | 'admin|user' | 'admin|user|guest'} role
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
async function middleware(role, req, res, next) {
	try {
		console.log("request incoming:", req.originalUrl, req.url);
		if (!req.headers.authorization) {
			res.status(404).json({
				status: "error",
				data: "Missing authorization header",
			});
			return;
		}

		const token = req.headers.authorization;
		if (!token.split(" ")[1]) {
			res.status(404).json({
				status: "error",
				data: "Missing Token",
			});
			return;
		}

		const userData = decrypt(token);
		if (!userData) {
			res.status(400).json({
				status: "error",
				data: "Invalid Token",
			});
			return;
		}

		if (
			!(
				typeof userData === "object" &&
				userData.userId &&
				typeof userData.userId === "string" &&
				userData.role &&
				typeof userData.role === "string" &&
				role
					.split("|")
					.filter((ele) => ele !== "")
					.includes(userData.role.toLowerCase()) &&
				userData.iat &&
				typeof userData.iat === "number" &&
				userData.exp &&
				typeof userData.exp === "number"
			)
		) {
			res.status(400).json({
				status: "error",
				data: "Invalid Token",
			});
			return;
		}

		// find the userId in the db with the specified role
		try {
			const userExists = await Users.findById(userData.userId);
			if (!userExists) {
				throw new Error("User Not Found");
			}
			if (userExists.role !== userData.role) {
				res.status(404).json({
					status: "error",
					data: "User Not Found",
				});
				return;
			}
		} catch (error) {
			res.status(404).json({
				status: "error",
				data: "User Not Found",
			});
			return;
		}

		next();
	} catch (error) {
		res.status(500).json({
			status: "error",
			data: "Unknown error occurred!",
		});
	}
}

module.exports = middleware;

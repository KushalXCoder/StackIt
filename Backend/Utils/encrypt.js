// @ts-check

const crypto = require("crypto");

/**
 *
 * @param {{ userId: string, iat: number, exp: number, role: string }} data
 * @returns {string | null}
 */
function encrypt(data) {
	if (!process.env.ENCRYPTION_KEY || !process.env.IV_LENGTH || !Number(process.env.IV_LENGTH)) {
		console.error("Missing encryption key or iv length!");
		return null;
	}
	const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
	if (key.length !== 32) {
		console.error("Key length must be 32 bytes!");
		return null;
	}

	const iv = crypto.randomBytes(Number(process.env.IV_LENGTH));
	const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

	const json = JSON.stringify(data);
	let encrypted = cipher.update(json, "utf8", "hex");
	encrypted += cipher.final("hex");

	return `${iv.toString("hex")}:${encrypted}`;
}

module.exports = encrypt;

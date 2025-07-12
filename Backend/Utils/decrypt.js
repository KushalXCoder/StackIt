// @ts-check

const crypto = require("crypto");

/**
 *
 * @param {string} token
 * @returns {Record<string, string | number> | null}
 */
function decrypt(token) {
	if (!token.startsWith("Bearer ") && token.length === 39) {
		console.error("Token must start with 'Bearer ' and be of exactly 39 characters");
		return null;
	}
	if (!process.env.ENCRYPTION_KEY || !process.env.IV_LENGTH) {
		console.error("Missing encryption key or iv length!");
		return null;
	}
	const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
	if (key.length !== 32) {
		console.error("Key length must be 32 bytes!");
		return null;
	}

	const [ivHex, encrypted] = token.split(" ")[1].split(":");
	if (!ivHex || !encrypted) {
		console.error("Invalid iv or encrypted data!");
		return null;
	}

	const iv = Buffer.from(ivHex, "hex");
	if (iv.length !== Number(process.env.IV_LENGTH)) {
		console.error(`IV length must be ${process.env.IV_LENGTH} bytes!`);
		return null;
	}

	const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

	let decrypted = decipher.update(encrypted, "hex", "utf8");
	decrypted += decipher.final("utf8");

	return JSON.parse(decrypted);
}

module.exports = decrypt;

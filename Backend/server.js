const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const initMongoDB = require("./Databases/initMongoDB");
const initRedis = require("./Databases/initRedis");
const initCloudinary = require("./Databases/initCloudinary");
const checkEnv = require("./Utils/checkEnv");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const guestRouter = require("./routes/guestRoutes");
const middleware = require("./middlewares/middleware");
const cookieParser = require("cookie-parser");

dotenv.config();

if (!checkEnv()) {
	console.error("Env's missing!");
	process.exit(0);
}

initMongoDB();
initRedis();
initCloudinary();

const port = process.env.PORT || 3000;
const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL ?? "http://localhost:3000",
		credentials: true,
	})
);

app.get("/", async (req, res) => {
	return res.status(200).json("OK");
});

app.use("/auth", authRouter);
app.use(
	"/admin",
	cookieParser(),
	(req, res, next) => middleware("admin", req, res, next),
	express.json(),
	adminRouter
);
app.use(
	"/user",
	cookieParser(),
	(req, res, next) => middleware("admin|user", req, res, next),
	express.json(),
	userRouter
);
app.use("/guest", express.json(), guestRouter);

app.listen(port, () => console.log("Connected to port:", port));

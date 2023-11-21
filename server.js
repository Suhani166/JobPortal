//API Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
//packages imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

//security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
//file imports
const connectDB = require("./config/db");
//routes
const authRoute = require("./routes/authRoutes");
const testRoute = require("./routes/testRoutes");
const userRoute = require("./routes/userRoutes");
const jobRoute = require("./routes/jobsRoute");
const chatRoute = require("./routes/chatRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

//config
dotenv.config();

//mongoDB connection
connectDB();

//Swagger api config
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "SkillNest - Job Portal",
			description: "Node Expressjs Job Portal Application",
		},
		servers: [
			{
				url: "http://localhost:8080",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

//rest object
const app = express();
const port = process.env.PORT || 8080;

//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/chat", chatRoute);

//homeroute
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

//validation Middleware
app.use(errorMiddleware);

//listen
app.listen(port, () => {
	console.log(
		`Node Server running in ${process.env.DEV_MODE} Mode on port: ${port}`
	);
});

const dotnev = require("dotenv");

const path = require("path");

const express = require("express");
const morgan = require("morgan");

// SECURITY
// NO-SQL INJECTION PREVENT
const mongoSanitize = require("express-mongo-sanitize");

// SECURITY HEADERS
const helmet = require("helmet");

// XSS-PROTECTION
const xss = require("xss-clean");

// RATE-LIMIT
const rateLimit = require("express-rate-limit");

// HPP
const hpp = require("hpp");

// CORS
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const colors = require("colors");
colors.enable();

const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// ROUTE FILE
const projects = require("./routes/projects");
const tools = require("./routes/tools");

// LOAD ENV
dotnev.config({ path: "./config/config.env" });

// CONNECT DB
connectDB();

// Use basic routing middleware
// Express
const app = express();
// Body parser
app.use(express.json());
// Url encoded
app.use(express.urlencoded({ extended: true }));
// Cookie parser
app.use(cookieParser());
// Log Middleware in Dev
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
// File upload
app.use(fileUpload());

// Use security middleware
// Sanitiza data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Prevent https param pollution
app.use(hpp());
// Enable cors
app.use(cors());

// RATE LIMIT SET
const ViewsRateLimit = rateLimit({
	windowMs: 1 * 10 * 1000, //10 detik
	max: 100,
	message: { success: "false", message: "To many request" },
});

// Mount routers
app.use("/api/v1/project", ViewsRateLimit, projects);
app.use("/api/v1/tool", ViewsRateLimit, tools);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	// server.close(() => process.exit(1));
});

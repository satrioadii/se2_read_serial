const dotnev = require("dotenv");

const express = require("express");
const morgan = require("morgan");

// SECURITY
// CORS
const cors = require("cors");

// Serial Port
const SerialPort = require('serialport');
const sPort = new SerialPort('/dev/tty-usbserial1', { autoOpen: true });

const errorHandler = require("./middleware/error");

const colors = require("colors");
colors.enable();

const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// ROUTE FILE
// const updates = require("./routes/update");

// LOAD ENV
dotnev.config({ path: "./config/config.env" });

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
};

// File upload
app.use(fileUpload());

// Enable cors
app.use(cors());

// Mount routers
// app.use("/api/v1/update", projects);


//Serial Port "flowing mode"
sPort.on('data', function (data) {
	console.log('Data:', data);
});


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

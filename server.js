const dotnev = require("dotenv");

const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const io = require('socket.io-client');

// SECURITY
// CORS
const cors = require("cors");

// Serial Port
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const sPort = new SerialPort("COM4", { autoOpen: true, baudRate: 9600 });


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
}

// File upload
app.use(fileUpload());

// Enable cors
app.use(cors());

const socketPath = 'http://127.0.0.1:5001'; 
const socket = io(socketPath);

console.log(socketPath);

//Serial Port "flowing mode"
const parser = sPort.pipe(new Readline({ delimiter: "\r\n" }));
parser.on("readable", async (data) => {
	let result = parser.read().toString();

	const regex = /\x00/g;

	let data2 = result.replace(regex, "");

	console.log("Retrieved Data (from STM):", parseInt(data2));

	console.log("send data to server");
	socket.emit("stmdata", data2, (res) => {
		console.log('response:', res);
	});
});

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
});

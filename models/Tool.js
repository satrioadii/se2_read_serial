const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
	label: {
		type: String,
		required: [true, "Please add the tools label"],
		maxlength: [60, "Label can not be more than 60 characters"],
	},
	color: {
		type: String,
		required: [true, "Please add the color type (primary or secondary)"],
		enum: ["primary", "secondary"],
	},
	link: { type: String },
	variant: { type: String },
});

module.exports = mongoose.model("Tool", ToolSchema);

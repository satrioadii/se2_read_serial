const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Tool = require("../models/Tool");

// @desc	Get all tool
// @route	GET /api/v1/tool
// @access	public
exports.getTools = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc	Get a tool
// @route	GET /api/v1/tool/:id
// @access	public
exports.getTool = asyncHandler(async (req, res, next) => {
	const tool = await Tool.findById(req.params.id);

	if (!tool) {
		return next(new ErrorResponse(`Tool not found`, 404));
	}

	res.status(200).json({
		success: true,
		data: tool,
	});
});

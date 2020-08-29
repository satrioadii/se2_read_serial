const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Project = require("../models/Project");

// @desc	Get all project
// @route	GET /api/v1/project
// @access	public
exports.getProjects = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc	Get a project
// @route	GET /api/v1/project/:id
// @access	public
exports.getProject = asyncHandler(async (req, res, next) => {
	// Select these fields only
	const fields =
		"modalImage category descriptionDetail organizationImage tools links";

	// Find Project
	let project = await Project.findOne({ _id: req.params.id })
		.select(fields)
		.populate({ path: "tools" });

	if (!project) {
		return next(new ErrorResponse(`Project not found`, 404));
	}

	res.status(200).json({
		success: true,
		data: project,
	});
});

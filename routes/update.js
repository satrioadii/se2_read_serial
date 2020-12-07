const express = require("express");
const { getProjects, getProject } = require("../controllers/update");

const Project = require("../models/Update");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");

// Get project list and Create a project
router
	.route("/")
	.get(
		advancedResults(Project, null, { select: "title description image" }),
		getProjects
	);

// Get project detail, update a project, delete a project
router.route("/:id").get(getProject);

module.exports = router;

const advancedResults = (model, populate, exactOptions) => async (
	req,
	res,
	next
) => {
	let query;

	// Copy req.query
	const reqQuery = { ...req.query };

	// Fields to exclude
	const removeFields = ["select", "sort", "page", "limit"];

	// Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param]);

	// Create query string
	let queryStr = JSON.stringify(reqQuery);

	// Create operators ($gt, $gte, etc)
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);

	// Finding resource
	query = model.find(JSON.parse(queryStr));

	// Select
	if (exactOptions.select) {
		query = query.select(exactOptions.select);
	} else if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		query = query.select(fields);
	}

	// Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	} else {
		query = query.sort("-createdAt");
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const startIndex = (page - 1) * limit;
	const total = await model.countDocuments();

	query = query.skip(startIndex).limit(limit);

	if (populate) {
		query = query.populate(populate);
	}

	// Executing query
	const results = await query;

	// Pagination results
	const pagination = {};

	// Total page
	pagination.total = Math.ceil(total / limit);

	// Current Page
	pagination.current = page;

	res.advancedResults = {
		success: true,
		count: results.length,
		pagination: pagination,
		data: results,
	};

	next();
};

module.exports = advancedResults;

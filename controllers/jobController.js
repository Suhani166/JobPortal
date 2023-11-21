const mongoose = require("mongoose");
const jobsModel = require("../models/jobsModel");
const moment = require("moment/moment");

// ===========CREATE JOB=============
const createJobController = async (req, res, next) => {
	try {
		const { company, position } = req.body;
		if (!company || !position) {
			next({
				statusCode: 400,
				message: "Company name and position name are required.",
			});
		}
		req.body.createdBy = req.user.userId;
		const job = await jobsModel.create(req.body);
		res.status(201).json({
			success: true,
			message: "Job created successfully",
			job,
		});
	} catch (error) {
		next(error);
	}
};

// ===========GET JOB=============
const findJobsController = async (req, res) => {
	const { search, status, workLocation, workType, sort } = req.query;
	const queryObject = {
		createdBy: req.user.userId,
	};

	//searching
	if (search) {
		queryObject.position = { $regex: search, $options: "i" };
	}

	//filtering
	if (status && status !== "all") {
		queryObject.status = status;
	}
	if (workLocation && workLocation !== "all") {
		queryObject.workLocation = workLocation;
	}
	if (workType && workType !== "all") {
		queryObject.workType = workType;
	}
	let queryResult = jobsModel.find(queryObject);
	//sorting
	if (sort === "latest") {
		queryResult = queryResult.sort("-createdAt");
	}
	if (sort === "oldest") {
		queryResult = queryResult.sort("createdAt");
	}
	if (sort === "a-z") {
		queryResult = queryResult.sort("position");
	}
	if (sort === "z-a") {
		queryResult = queryResult.sort("-position");
	}

	//pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 8;
	const skip = (page - 1) * limit;

	queryResult = queryResult.skip(skip).limit(limit);
	const totalJobs = await jobsModel.countDocuments(queryResult);
	const numOfPage = Math.ceil(totalJobs / limit);

	const jobs = await queryResult;

	// const jobs = await jobsModel.find({ createdBy: req.user.userId });
	res.status(200).json({
		totalJobs,
		jobs,
		numOfPage:page,
	});
};

// ===========UPDATE JOB=============
const updateJobController = async (req, res, next) => {
	const { id } = req.params;
	const { company, position } = req.body;
	if (!company || !position) {
		next({ statusCode: 400, message: "Please provide all fields" });
	}
	const job = await jobsModel.findOne({ _id: id });
	if (!job) {
		next({ statusCode: 404, message: "No jobs found." });
	}
	if (!req.user.userId === job.createdBy.toString()) {
		next({
			statusCode: 400,
			message: "You are not authorized to update this job",
		});
		return;
	}

	const updateJob = await jobsModel.findByIdAndUpdate({ _id: id }, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).send({
		message: "Job Updated Successfully",
		updateJob,
	});
};

// ===========DELETE JOB=============
const deleteJobController = async (req, res, next) => {
	const { id } = req.params;
	const job = await jobsModel.findOne({ _id: id });
	if (!job) {
		next({ statusCode: 404, message: "Job Not Found." });
	}
	if (!req.user.userId === job.createdBy.toString()) {
		next({
			statusCode: 400,
			message: "You are not authorized to delete the job.",
		});
	}
	await job.deleteOne();
	res.status(200).json({
		message: "Job deleted successfully.",
	});
};

// ===========JOB STATS & FILTER=============
const jobStatsController = async (req, res) => {
	const stats = await jobsModel.aggregate([
		{
			$match: {
				createdBy: new mongoose.Types.ObjectId(req.user.userId),
			},
		},
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
			},
		},
	]);
	const defaultStats = {
		pending: stats.pending || 0,
		rejected: stats.rejected || 0,
		interview: stats.interview || 0,
	};

	//monthly yearly stats
	let monthlyApplication = await jobsModel.aggregate([
		{
			$match: {
				createdBy: new mongoose.Types.ObjectId(req.user.userId),
			},
		},
		{
			$group: {
				_id: {
					year: { $year: "$createdAt" },
					month: { $month: "$createdAt" },
				},
				count: {
					$sum: 1,
				},
			},
		},
	]);

	monthlyApplication = monthlyApplication
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format("MMM Y");
			return { date, count };
		})
		.reverse();
	res.status(200).json({
		totalJobs: stats.length,
		defaultStats,
		monthlyApplication,
	});
};

module.exports = {
	createJobController,
	findJobsController,
	updateJobController,
	deleteJobController,
	jobStatsController,
};

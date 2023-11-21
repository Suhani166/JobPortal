const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "Company name is required."],
		},
		position: {
			type: String,
			required: [true, "Position name is required."],
		},
		status: {
			type: String,
			enum: ["pending", "rejected", "interview"],
			default: "pending",
		},
		workType: {
			type: String,
			enum: ["full-time", "part-time", "internship"],
			default: "full-time",
		},
		workLocation: {
			type: String,
			required: [true, "Work Location is required."],
			default: "remote",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const job = mongoose.model("Job", jobSchema);
module.exports = job;

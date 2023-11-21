const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			validate: validator.isEmail,
		},
		password: {
			type: String,
			required: true,
			minlength: [6, "Password should contain atleast 6 characters"],
			select: true,
		},
		location: {
			type: String,
			default: "India",
		},
		// role: {
		// 	type: String,
		// 	enum: ["jobseeker", "employer"],
		// 	required: true,
		// },
	},
	{ timestamps: true }
);

//middleware
userSchema.pre("save", async function () {
	if (!this.isModified) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.checkPassword = async function (userPassword) {
	const isMatch = await bcrypt.compare(userPassword, this.password);
	return isMatch;
};

userSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.SECRET_KEY, {
		expiresIn: "1d",
	});
};

const User = mongoose.model("User", userSchema);
module.exports = User;

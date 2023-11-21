const userModel = require("../models/userModel");

const registerController = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!firstName) {
			next({ statusCode: 400, message: "Please provide name." });
		}
		if (!email) {
			next({ statusCode: 400, message: "Please provide a valid email." });
		}
		if (!password) {
			next({ statusCode: 400, message: "Please enter a password." });
		}

		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			next({ statusCode: 400, message: "User already exists." });
		}

		const user = await userModel.create({
			firstName,
			lastName,
			email,
			password,
		});

		//token
		const token = user.createJWT();
		res.status(201).send({
			success: true,
			message: "User Registered Successfully",
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			token,
		});
	} catch (error) {
		next(error);
	}
};

const loginController = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next({
				statusCode: 400,
				message: "Please provide all necessary fields",
			});
		}
		//find if user is registered
		const user = await userModel.findOne({ email }).select("+password");
		if (!user) {
			next({
				statusCode: 400,
				message: "The email or password is incorrect.",
			});
		}

		// user.password = undefined;
		//checking if password is correct
		const isMatch = await user.checkPassword(password);
		if (!isMatch) {
			res.status(400).send({
				success: false,
				message: "The email or password is incorrect.",
			});
		}

		const token = user.createJWT();
		res.status(200).json({
			success: true,
			message: "Logged In successfully.",
			user,
			token,
		});
	} catch (error) {
		next(error);
	}
};
module.exports = { registerController, loginController };

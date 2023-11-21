const userModel = require("../models/userModel");

const updateUserController = async (req, res, next) => {
	const { firstName, lastName, email, location } = req.body;
	if (!firstName || !lastName || !email || !location) {
		next({
			statusCode: 400,
			message: "Please provide all fields.",
		});
	}
	const user = await userModel.findOne({ _id: req.user.userId });
	user.firstName = firstName;
	user.lastName = lastName;
	user.email = email;
	user.location = location;

	await user.save();
	const token = user.createJWT();
	res.status(200).json({
		user,
		token,
	});
};

const getUserController = async (req, res) => {
	try {
		const user = await userModel.findById({ _id: req.body.user.userId });
		user.password = undefined;
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "User not Found",
			});
		}
        else{
            res.status(200).send({
				success: true,
				data: user,
			})
        }
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Auth error",
			error: error.message,
		});
	}
};
module.exports = { updateUserController, getUserController };

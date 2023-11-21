const errorMiddleware = (err, req, res, next) => {
	console.log(err);
	
	// Default values
	let error = {
		statusCode: 500,
		message: "Something went wrong. Try again!",
	};

	// Check if the error object has custom properties
	if (err.statusCode) {
		error.statusCode = err.statusCode;
	}
	if (err.message) {
		error.message = err.message;
	}

	res.status(error.statusCode).send({
		success: false,
		message: error.message,
	});
};
module.exports = errorMiddleware;

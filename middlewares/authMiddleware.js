const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
	const authHeader = req.headers.authorization;
    console.log(authHeader);
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		next({ statusCode: 400, message: "Authorization failed." });
	}
	const token = authHeader.split("Bearer ")[1];
	// const token = authHeader.slice(7);
	try {
		const payload = jwt.verify(token, process.env.SECRET_KEY);
		req.body.user = { userId: payload.userId };
		next();
	} catch (error) {
		next({ statusCode: 400, message: "Authorization failed." });
	}
};

module.exports = userAuth;

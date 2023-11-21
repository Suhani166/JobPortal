const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`Connected to the database ${mongoose.connection.host}`);
	} catch (error) {
		console.error("Error connecting to the database:", error);
	}
};

module.exports = connectDB;

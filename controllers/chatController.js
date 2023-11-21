const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
	apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(config);
const API_URL = "https://api.openai.com/v1/chat/completions";


const chatController = async (req, res) => {
	const { prompt } = req.body;
	try {
		const completion = await openai.createCompletion({
			engine: "davinci",
			prompt: prompt,
			max_tokens: 100,
			temperature: 0.7,
			n: 1,
			stop: "\n",
		});

		res.send(completion.choices[0].text);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error processing the request");
	}
};

module.exports = { chatController };

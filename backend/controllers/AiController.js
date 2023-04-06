const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.summarize = async (req, res) => {
    let text = req.query.text;
    console.log(text);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": "write a summary for " + text }]
    });
    console.log(response.data.choices[0].message.content);
    return res.status(200).send({
        status: "error",
        results: response.data.choices[0].message.content
    })
}

exports.createTweet = async (req, res) => {
    let text = req.query.text;
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": "write a tweet for " + text }]
    });
    return res.status(200).send({
        status: "error",
        results: response.data.choices[0].message.content
    })
}
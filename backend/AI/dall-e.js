const dotenv = require("dotenv").config();
const axios = require('axios');
const FormData = require('form-data');
const express = require("express");

const TOKEN = process.env.OPENAI_API_KEY;

const app = express.Router();

app.get('/useDall-e', (req, res) => {

    if (!req.query.prompt || !req.query.count) {
        console.log('No prompt received');
        return res.status(500).send('No prompt received');
    }

    let prompt = req.query.prompt;
    let count = parseInt(req.query.count);

    // Uses 512x512 images for performance
    let details = {
        "prompt": prompt,
        "n": count,
        "size": "512x512"
    }

    const options = {
        method: 'POST',
        url: 'https://api.openai.com/v1/images/generations',
        data: details,
        headers: {
            'Content-Type': `application/json`,
            'Authorization': `Bearer ${TOKEN}`,
        },
    };

    // POST to openai and receive url for generated image
    axios(options)
        .then((response) => {
            console.log('Response:', response.data);
            res.status(response.status).send(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).send("Error");
        });
});

module.exports = app;
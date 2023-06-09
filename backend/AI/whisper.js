const multer = require('multer');
const dotenv = require("dotenv").config();
const axios = require('axios');
const FormData = require('form-data');
const express = require("express");

const TOKEN = process.env.OPENAI_API_KEY;
const MODEL = 'whisper-1';

const app = express.Router();
const upload = multer();

app.post('/useWhisper', upload.single('file'), (req, res) => {

    if(!req.file) {
        console.log('No file received');
        return res.status(500).send('No file received');
    }
    const file = req.file;
    console.log('File:', file.originalname);

    // create a FormData object and append the file data to it
    const formData = new FormData();
    formData.append('file', req.file.buffer, { filename: file.originalname });
    formData.append('model', MODEL);

    // stream the file data as the request body to the other server
    const options = {
        method: 'POST',
        url: 'https://api.openai.com/v1/audio/transcriptions',
        data: formData,
        headers: {
            'Content-Type': `multipart/form-data`,
            'Authorization': `Bearer ${TOKEN}`,
        },
    };

    axios(options)
        .then((response) => {
            console.log('Response:', response.data);
            //Use gpt to generate content based on this text
            //Send back the generated text
            res.status(response.status).send(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.sendStatus(500);
        });
});

module.exports = app;
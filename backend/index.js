//imports
const express = require("express");
var cors = require('cors');
const config = require("./config/config");
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser')
require('./config/passport');
const path = require('path');
const dotenv = require('dotenv').config();
const {checkTwitterHelper} = require("./controllers/AuthController");


//Start of AWS Parameter Store code
const AWS = require('aws-sdk');
// Set the AWS region
AWS.config.update({
    region: 'us-west-1',

});
const fs = require('fs');
const ssm = new AWS.SSM();
// Retrieve the value of environment variables from Parameter Store
async function getParameter(parameterName) {
    const params = {
        Name: parameterName,
        WithDecryption: true
    };
    console.log(JSON.stringify(params));
    const response = await ssm.getParameter(params).promise();
    return response.Parameter.Value;
}
async function runner() {


        // THIS GRABS THE ENVIRONMENT VARIABLES FROM AWS PARAMETER STORE
        // Comment out because it would cause problems with the local environment
        // keep using your env file for local development

        const myVar = await getParameter('MONGODB_URI');
        process.env.MONGODB_URI = myVar;

        const myVar2 = await getParameter('TWITTER_CLIENT_ID');
        process.env.TWITTER_CLIENT_ID = myVar2;

        const myVar3 = await getParameter('TWITTER_CLIENT_SECRET');
        process.env.TWITTER_CLIENT_SECRET = myVar3;

        const myVar4 = await getParameter('OPENAI_API_KEY');
        process.env.OPENAI_API_KEY = myVar4;


        console.log("__________")
        console.log(process.env.MONGODB_URI);
        console.log(process.env.TWITTER_CLIENT_ID);
        console.log(process.env.TWITTER_CLIENT_SECRET);
        console.log(process.env.OPENAI_API_KEY);

}

runner().then(() => {

    // import routes
    const adminRoute = require("./routes/AdminRoute");
    const authRoute = require("./routes/AuthRoute");
    const postRoute = require("./routes/PostRoute");

    const whisper = require("./AI/whisper");
    const useDalle = require("./AI/dall-e");
    const aiRoute = require("./routes/AiRoute");


    // express app initialized
    const app = express();

    // middleware
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(session(config.session));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.json());
    //app.use(cors());
    app.use((req, res, next) => {
        console.log("middleware");
        console.log(req.originalUrl);
        res.header("Access-Control-Allow-Origin", req.header('origin'));
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Private-Network", "true")
        next();
    });

    //Up here so at least i have one route I can trust
    app.get('/api', (req, res) => {
        console.log("api happy");
        console.log(req.user);
        return res.send("api happy");
    });

    // routes
    app.use("/api/admin", adminRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/post", postRoute);

    app.use("/api/aiv2", whisper);
    app.use("/api/aiv2", useDalle);
    app.use("/api/ai", aiRoute);


    // SSO
    app.get("/logout", (req, res) => {
        console.log("logout");
        req.logout(() => {
            req.user = null;
            return res.redirect("http://localhost:3000");
        });
    });

    app.get("/login", passport.authenticate('saml', () => {
        console.log("login");
        if (checkTwitterHelper(req.user.attributes.email)) {
            return res.redirect("http://localhost:3000");
        } else {
            authTwitter(req, res);
        }
    }));

    app.get("/safety", (req, res) => {
        console.log("safety");
        return res.redirect("http://localhost:3000");
    });
    app.post("/login/callback", passport.authenticate('saml', config.saml.options));

    app.get("/checkLogin", (req, res) => {
        if (req.user) {
            return res.status(200).send({
                status: "success"
            })
        } else {
            return res.status(401).send({
                status: "fail"
            })
        }
    });

    app.get("/useridentity", (req, res, next) => {
        console.log("useridentity");
        if (!req.isAuthenticated()) {
            console.log("not authenticated");
            return res.status(400).send({ data: "not authenticated" });
        } else {
            console.log("authenticated");
            res.status(200).send({ user: req.user });
        }
    });

    app.get("/api/sad", (req, res) => {
        //console.log(req.flash('error'));
        console.log("sad");
        res.status(200).send({ data: "sad" });
    });

    // default route
    app.get('/api', (req, res) => {
        console.log('GET Received');
        console.log(req.user);
        res.send('DEFAULT ROUTE!');
    });

    console.log("done");
    // listen for requests
    const port = process.env.PORT || 5003;
    app.listen(port, () => {
        console.log(`Backend is running on port ${port}`);
    });

    module.exports = app;
}).catch((err) => {
    console.log(err);
})
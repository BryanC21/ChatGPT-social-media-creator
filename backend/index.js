//imports
const express = require("express");
var cors = require('cors');
const config = require("./config/config");
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser')
require('./config/passport');
//const path = require('path');
//const dotenv = require('dotenv').config();


// Start of AWS Parameter Store code
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
    // Write the environment variable to a new .env file
    //const envFilePath = path.join(__dirname, '.env');
    // Clear the file if it already exists
    //fs.writeFileSync(envFilePath, '');
    // Hard write the environment variable to a new .env file
    const myVar = await getParameter('MONGODB_URI');
   
    //fs.appendFileSync(envFilePath, `MONGODB_URI=${myVar}\n`);
    process.env.MONGODB_URI = myVar;

    const myVar2 = await getParameter('TWITTER_CLIENT_ID');
    //fs.appendFileSync(envFilePath, `TWITTER_CLIENT_ID=${myVar2}\n`);
    process.env.TWITTER_CLIENT_ID = myVar2;

    const myVar3 = await getParameter('TWITTER_CLIENT_SECRET');
    //fs.appendFileSync(envFilePath, `TWITTER_CLIENT_SECRET=${myVar3}\n`);
    process.env.TWITTER_CLIENT_SECRET = myVar3;

    /*
    console.log("__________")
    console.log(process.env.MONGODB_URI);
    console.log(myVar2);
    console.log(myVar3);
    */
}

runner().then(() => {

    // import routes
    const userRoute = require("./routes/UserRoute");
    const adminRoute = require("./routes/AdminRoute");
    const searchRoute = require("./routes/SearchRoute");
    const authRoute = require("./routes/AuthRoute");
    const postRoute = require("./routes/postRoute");


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
        //console.log(req);
        //console.log(res);
        res.header("Access-Control-Allow-Origin", req.header('origin'));
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Private-Network", "true")
        next();
    });

    //Up here so at least i have one route I can trust
    app.get('/api', (req, res) => {
        console.log("api happy");
        return res.send("api happy");
    });

    // routes
    app.use("/api/user", userRoute);
    app.use("/api/admin", adminRoute);
    app.use("/api/search", searchRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/post", postRoute);

    // SSO
    app.get("/logout", (req, res) => {
        console.log("logout");
        req.logout(() => {
            res.send("logged out");
        });
    });

    app.get("/login", passport.authenticate('saml', () => {
        console.log("login");
        return res.redirect("http://54.183.160.128:3000/sso");

    }));

    app.get("/safety", (req, res) => {
        console.log("safety");
        return res.redirect("http://54.183.160.128:3000/employees?mode=default");
    });
    app.post("/login/callback", passport.authenticate('saml', config.saml.options));

    app.get("/useridentity", (req, res, next) => {
        console.log("useridentity");
        if (!req.isAuthenticated()) {
            console.log("not authenticated");
            return res.status(400).send({ data: "not authenticated" });
        } else {
            console.log("authenticated");
            console.log(req.user);
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
        console.log('GET Received')
        res.send('DEFAULT ROUTE!')
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
const path = require('path');

const config = {
    saml : {
        cert: path.join(__dirname, 'saml.pem'),
        entryPoint: "https://trial-1322739.okta.com/app/trial-1322739_sso272final_1/exk3gbf6g5J92dTMu697/sso/saml",
        issuer: "http://54.183.160.128:5002",
        options: {
            failureRedirect: "/login",
            successRedirect: "/safety",
            failureFlash: true,
        }
    },
    server : {
        port: 5002
    },
    session: {
        resave: false,
        secret: 'badsecret',
        saveUninitialized: true,
    }
};

module.exports = config;
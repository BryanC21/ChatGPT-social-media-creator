const path = require('path');

const config = {
    saml : {
        cert: path.join(__dirname, 'saml.pem'),
        entryPoint: "https://dev-24842710.okta.com/app/dev-24842710_chatgptsocialmedia_1/exk96e0w1xoaQBez35d7/sso/saml",
        issuer: "http://www.okta.com/exk96e0w1xoaQBez35d7",
        options: {
            failureRedirect: "/api/login",
            successRedirect: "/api/safety",
            failureFlash: true,
        }
    },
    server : {
        port: 5003
    },
    session: {
        resave: false,
        secret: 'badsecret',
        saveUninitialized: true,
    }
};

module.exports = config;
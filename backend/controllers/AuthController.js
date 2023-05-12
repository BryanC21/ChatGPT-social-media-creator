require('dotenv').config();
const oauth = require('oauth');
const session = require('express-session');
const User = require('../database/models/User');
const Account = require('../database/models/Account');
const Platform = require('../database/models/Platform');

const consumer = new oauth.OAuth(
    "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
    process.env.TWITTER_CLIENT_ID, process.env.TWITTER_CLIENT_SECRET, "1.0A", "http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/auth/twitter/callback", "HMAC-SHA1");

// Twitter Authentication
exports.authTwitter = (req, res) => {
    consumer.getOAuthRequestToken(function(error, oauthRequestToken, oauthRequestTokenSecret, results){
        if (error) {
            console.log(error);
            res.status(500).send({error:"Error getting OAuth request token : " + error});
        } else {
            req.session.token = oauthRequestToken;
            req.session.secret = oauthRequestTokenSecret;
            res.redirect("https://twitter.com/oauth/authorize?oauth_token="+oauthRequestToken)
        }
    });
}

// Twitter Authentication Callback
exports.authTwitterCallback = async (req, res) => {
    // var user_id = req.user.attributes.email;
    consumer.getOAuthAccessToken(req.query.oauth_token, req.session.secret, req.query.oauth_verifier, function(err, oauthAccessToken, oauthAccessTokenSecret, results) {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: err
            })
        } else {
            console.log("saving account");
            req.session.token = oauthAccessToken;
            req.session.secret = oauthAccessTokenSecret;
            // var account = new Account({
            //     user_id: user_id,
            //     platform_id: platform_id,
            //     token: oauthAccessToken,
            //     secret: oauthAccessTokenSecret,
            // })
            // account.save()
            // req.session.oauthAccessToken = oauthRequestToken;
            // req.session.oauthAccessToken = oauthRequestTokenSecret;
            // .then(result => {
            return res.status(200).send({
                status: "success"
            })
            // })
            // .catch((err) => {
            //     return res.status(401).send({
            //         status: "error",
            //         message: err
            //     })
            // });
        }
    });
}

exports.checkTwitter = async (req, res) => {
    var user_id = req.user.attributes.email;
    if (await checkTwitterHelper(user_id)) {
        return res.status(200).send({
            status: "success"
        })
    } else {
        return res.status(401).send({
            status: "error",
        })
    }
}

checkTwitterHelper = async (user_id) => {
<<<<<<< HEAD
    var platform_id = await Platform.findOne({name: "Twitter"})
    .then(result => result._id)
    .catch(err => console.log(err));;
=======
    var platform_id = await Platform.findOne({name: "Twitter"}).then(result => result._id).catch((err) => console.error(err));
>>>>>>> 85d173ba4f5b60b0c6e6f3a7f5a4a679a602bdf7
    let result = await Account.exists({user_id: user_id, platform_id: platform_id});
    return result;
}
exports.checkTwitterHelper = checkTwitterHelper;
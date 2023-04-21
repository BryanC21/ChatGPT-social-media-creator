require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const User = require('../database/models/User');
const Account = require('../database/models/Account');
const Platform = require('../database/models/Platform');
const Post = require('../database/models/Post');

// Post Twitter
exports.postTwitter = async (req, res) => {
    let message = req.query.message;
    var user_id = req.query.user.attributes.email;
    var platform_id = await Platform.findOne({name: "Twitter"}).then(result => result._id);
    var account = await Account.findOne({user_id: user_id, platform_id: platform_id})
    .then(result => result);

    client = new TwitterApi({
        appKey: process.env.TWITTER_CLIENT_ID,
        appSecret: process.env.TWITTER_CLIENT_SECRET,
        accessToken: account.token,
        accessSecret: account.secret,
    });
    client.v2.tweet(message).then((val) => {
        let post = new Post({
            user_id: user_id,
            text: message,
            image: "",
        })
        return res.status(200).send({
            status: "success",
            'message': 'Tweet created successfully'
        })
    }).catch((err) => {
        return res.status(401).send({
            status: "error",
            'message': err
        })
    });
}

require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const User = require('../database/models/User');
const Account = require('../database/models/Account');
const Platform = require('../database/models/Platform');

// Post Twitter
exports.postTwitter = async (req, res) => {
    var user_id = await User.findOne({first_name: "Kevin"}).then(result => result._id);
    var platform_id = await Platform.findOne({name: "Twitter"}).then(result => result._id);
    var account = await Account.findOne({user_id: user_id, platform_id: platform_id})
    .then(result => result);

    client = new TwitterApi({
        appKey: process.env.TWITTER_CLIENT_ID,
        appSecret: process.env.TWITTER_CLIENT_SECRET,
        accessToken: account.token,
        accessSecret: account.secret,
    });
    let message = req.query.message;
    client.v2.tweet(message).then((val) => {
        res.send({ 'code': 200, 'message': 'Tweet created successfully'} );
    }).catch((err) => {
        res.send({ 'code': 400, 'message': 'Invalid tweet text' });
    });
}
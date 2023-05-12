require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const User = require('../database/models/User');
const Account = require('../database/models/Account');
const Platform = require('../database/models/Platform');
const Post = require('../database/models/Post');
const download = require('image-downloader');

async function downloadImage(url, filepath) {
    return await download.image({
       url,
       dest: filepath 
    })
    .catch((err) => console.error(err));
}

// Post Twitter
exports.postTwitter = async (req, res) => {
    let message = req.query.message;
    var img = req.query.img;
    var user_id = req.user.attributes.email;
    var platform_id = await Platform.findOne({name: "Twitter"}).then(result => result._id).catch((err) => console.error(err));
    var account = await Account.findOne({user_id: user_id, platform_id: platform_id})
    .then(result => result)
    .catch((err) => console.error(err));

    client = new TwitterApi({
        appKey: process.env.TWITTER_CLIENT_ID,
        appSecret: process.env.TWITTER_CLIENT_SECRET,
        accessToken: account.token,
        accessSecret: account.secret,
    });
    var media = {}
    if (img && img != "") {
        const img_name = await downloadImage(img, "../../img/");
        const mediaId = await client.v1.uploadMedia(img_name["filename"]);
        media = {media: { media_ids: [mediaId] }}
    }
    client.v2.tweet(message, media).then((val) => {
        let post = new Post({
            user_id: user_id,
            text: message,
            image: img,
        })
        post.save().then(() => console.log("Platform Saved"));
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

exports.getPostHistory = async (req, res) => {
    var user_id = req.user.attributes.email;
    var posts = await Post.find({user_id: user_id});

    return res.status(200).send({
        status: "success",
        results: posts
    })
}
const Post = require('../database/models/Post');

exports.getPostHistoryByUserId = async (req, res) => {
    var user_id = req.query.user_id;
    var posts = await Post.find({user_id: user_id});

    return res.status(200).send({
        status: "success",
        results: posts
    })
}
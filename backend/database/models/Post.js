const mongoose = require('../database');

const PostSchema = new mongoose.Schema(
	{
		user_id: mongoose.ObjectId,
		text: String,
		image: String,
	}, 
	{ timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema);
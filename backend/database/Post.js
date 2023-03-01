const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		user_id: Number,
		text: String,
		image: String,
	}, 
	{ timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema);
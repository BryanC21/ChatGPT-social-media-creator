const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
	{
		user_id: Number,
		platform_id: Number,
		token: String,
		secret: String,
	}, 
	{ timestamps: true }
)

module.exports = mongoose.model("Account", AccountSchema);
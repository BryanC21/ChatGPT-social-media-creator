const mongoose = require('../database');

const AccountSchema = new mongoose.Schema(
	{
		user_id: String,
		platform_id: mongoose.ObjectId,
		token: String,
		secret: String,
	}, 
	{ timestamps: true }
)

module.exports = mongoose.model("Account", AccountSchema);
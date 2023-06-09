const mongoose = require('../database');

const User = new mongoose.Schema(
	{
		user_id: String,
		first_name: String,
		last_name: String,
		email: String,
	}, 
	{ timestamps: true }
)

module.exports = mongoose.model("user", User);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		first_name: String,
		last_name: String,
		email: String,
		password: String,
	}, 
	{ timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);
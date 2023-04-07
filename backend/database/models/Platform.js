const mongoose = require('../database');

const PlatformSchema = new mongoose.Schema(
	{
		name: String
	}
)

module.exports = mongoose.model("Platform", PlatformSchema);
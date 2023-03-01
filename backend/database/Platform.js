const mongoose = require("mongoose");

const PlatformSchema = new mongoose.Schema(
	{
		name: String
	}
)

module.exports = mongoose.model("Platform", PlatformSchema);
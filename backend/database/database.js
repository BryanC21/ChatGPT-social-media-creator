const mongoose = require("mongoose");
 
// Set Up the Database connection
mongoose.connect("mongodb+srv://root:root@cluster0.mcppmqk.mongodb.net/main", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;

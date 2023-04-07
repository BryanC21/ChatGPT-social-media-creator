require('dotenv').config();
const mongoose = require("mongoose");
 
// Set Up the Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;

const mongoose = require('mongoose');
const User = require("./User");

const uri = "mongodb+srv://root:root@cluster0.mcppmqk.mongodb.net/main?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

const user = new User({first_name: "Kevin", last_name: "James", email: "kj@kj.com", password: "123"})
user.save().then(() => console.log("User Saved"));
console.log(user);
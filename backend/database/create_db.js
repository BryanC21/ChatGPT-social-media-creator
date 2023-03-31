const User = require('./models/User');
const Platform = require('./models/Platform');

const user = new User({first_name: "Kevin", last_name: "James", email: "kj@kj.com", password: "123"})
user.save().then(() => console.log("User Saved"));
console.log(user);

const platform = new Platform({name: "Twitter"})
platform.save().then(() => console.log("Platform Saved"));
console.log(platform);
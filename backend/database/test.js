var User = require("./models/User");
var Platform = require("./models/platform");
var Account = require("./models/account");

// User.find({}).then(doc => console.log(doc));
// Platform.find({}).then(doc => console.log(doc));
// Platform.deleteOne({"_id": "6425f748326d7734903f337f"}).then(result => console.log(result));

// var getUser = async () => {
//   // Inside getUser, we can await an async operation and interact with
//   // foundUser as a normal, non-promise value...
//   var platform_id = await Platform.findOne({name: "Twitter"}).then(result => result._id);
//   console.log(platform_id); // Prints '{name: 'bill', admin: false}'
// }

// getUser()

Account.find().then(doc => console.log(doc));
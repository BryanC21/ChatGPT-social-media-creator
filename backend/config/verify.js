
const verify = async (req, res, next) => {
    if (req.user) {
		next();
    } else {
		console.log("User not logged in");
        res.redirect('/api/login');
    }
};

module.exports = verify;
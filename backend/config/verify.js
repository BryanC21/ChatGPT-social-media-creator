const verify = (req, res, next) => {
    if (req.user) {
		console.log("User logged in");
        next();
    } else {
		console.log("User not logged in");
        res.redirect('/api/login');
    }
};

module.exports = verify;
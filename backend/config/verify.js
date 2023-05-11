const verify = (req, res, next) => {
    // if (req.user) {
    //     next();
    // } else {
    //     res.redirect('/login');
    // }
    next();
};

module.exports = verify;
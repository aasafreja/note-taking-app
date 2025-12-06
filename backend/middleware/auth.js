module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated && req.isAuthenticated()) return next();
        const err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    }
};

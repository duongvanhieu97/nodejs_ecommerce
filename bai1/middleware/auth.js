function RequireLogin(req, res, next) {
    if (req.session.name) {
        next()
    } else {
        res.redirect('/users/login')
    }
}

module.exports = RequireLogin
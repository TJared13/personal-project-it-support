module.exports = {
    userOnly: (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).send('Please log in')
        }
        next();
    },

    adminsOnly: (req, res, next) => {
        console.log(req.session.user.is_admin)
        if (!req.session.user.is_admin) {
            return res.status(403).send('You are not an admin')
        }
        next()
    }
};
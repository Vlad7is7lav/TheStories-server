const { User } = require("../models/user")

let auth = function (req, res, next) {
    let token = req.cookies.auth

    User.findByToken(token, (err, user) => {
        if (err) throw err
        if (!user) return res.json({ auth: false })

        req.user = user
        req.token = token
        next()
    })
}

module.exports = { auth }

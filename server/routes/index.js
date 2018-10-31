const express = require("express")
const passport = require("passport")

const router = new express.Router()

// Example and test routes for auth
router.route("/public").get((req, res) => res.send("public"))

// Local login - email/password
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, token) => {
        //TODO: add response formatter

        // internal error
        if (err || !user)
            return res.json({
                success: false
            })

        return res.json({
            success: true,
            user,
            token
        })
    })(req, res, next)
})

// Jwt auth - Authorization: "token"
router.post("/private", passport.authenticate("jwt"), (req, res) => {
    res.json({
        success: true,
        message: "Jwt authenticated"
    })
})

module.exports = router

const express = require("express")
const passport = require("passport")


const router = new express.Router()

// Local login - email/password
router.route("/login")
  .post((req, res, next) => {
    passport.authenticate("local", (err, user, token) => {
      // internal error
      if (err || !user) return res.json({ success: false })

      return res.json({ success: true, user, token })
    })(req, res, next)
  })

// Public routes example
/*
router.route("/public")
  .get((req, res) => res.send("public"))
*/

// Private route example
/*
router.route("/private")
  .post(passport.authenticate("jwt"), (req, res) => {
    res.json({ success: true, message: "Jwt authenticated" })
  })
*/


module.exports = router

const express = require("express")
const passport = require("passport")

const redirector = require('../controllers/redirector')
const authConfigs = require("../../configs/constants").auth


const router = new express.Router()

// Local login - email/password
router.route("/auth/local")
  .post((req, res, next) => {
    passport.authenticate("local", (err, user, token) => {
      // internal error
      if (err || !user) return res.json({
        success: false
      })

      return res.json({
        success: true,
        user,
        token
      })
    })(req, res, next)
  })

// Google login
router.route('/auth/google')
  .get(passport.authenticate('google', {
    scope: authConfigs.google.SCOPES
  }))
router.route('/auth/google/callback')
  .get(function (req, res, next) {
    passport.authenticate("google", function (err, user, token) {
      if (err || !user) return res.json({
        success: false
      })
      else
        return res.json({
          success: true,
          user,
          token
        })
    })(req, res, next);
  })

router.route("/:shortened")
  .get(redirector.handle)


module.exports = router

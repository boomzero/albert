const passport = require("passport")
const ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategy = require("passport-jwt").Strategy
const LocalStrategy = require("passport-local").Strategy
const jwt = require("jsonwebtoken")

const User = require("../api/models/user")


const JWT_SECRET = "albertsecret"
const EXPIRESIN = "24h"

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.use("local", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
  },
  (username, password, done) => {
    try {
      User.findOne({
        username: username
      }).select('+password').exec((err, user) => { //include password in query for validation
        if (!user || !user.validatePassword(password)) return done(null, false)
        token = jwt.sign({}, JWT_SECRET, {
          audience: user.id,
          expiresIn: EXPIRESIN
        })
        return done(null, user, token)
      })
    } catch (err) {
      return done(err)
    }
  }
))

passport.use("jwt", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: JWT_SECRET
  },
  async (jwt_payload, done) => {
    try {
      const user = await User.findOne({
        id: jwt_payload.id
      })
      if (user) return done(null, user)
      else return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  }
))

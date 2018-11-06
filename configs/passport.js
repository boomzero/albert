const passport = require("passport")
const ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategy = require("passport-jwt").Strategy
const LocalStrategy = require("passport-local").Strategy
const jwt = require("jsonwebtoken")

const User = require("../api/models/user")


const JWT_SECRET = "albertsecret"
const EXPIRESIN = "24h"
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.use("local", new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    session: false
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username })
    } catch (err) {
      return done(err)
    }
    if (!user || !user.validatePassword(password)) return done(null, false)
    token = jwt.sign({}, JWT_SECRET, { audience: user.id, expiresIn: EXPIRESIN })
    return done(null, user, token)
  }
))

passport.use("jwt", new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: JWT_SECRET
  },
  async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ id: jwt_payload.id })
    } catch (err) {
      return done(err, false)
    }
    if (user) return done(null, user)
    else return done(null, false)
  }
))

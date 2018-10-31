const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
const LocalStrategy = require("passport-local").Strategy
const jwt = require("jsonwebtoken")

const User = require("../api/models/user")

const JWT_SECRET = "albertsecret"
const EXPIRESIN = "10h"
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'

passport.serializeUser(function(user, done) {
  done(null, user)
})

//TODO: not populate password when query user
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    function(username, password, done) {
      User.findOne(
        {
          username: username
        },
        function(err, user) {
          if (err) {
            return done(err)
          }

          if (!user || !user.validatePassword(password)) {
            return done(null, false)
          }
          token = jwt.sign({}, JWT_SECRET, {
            audience: user.id,
            expiresIn: EXPIRESIN
          })
          return done(null, user, token)
        }
      )
    }
  )
)

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    function(jwt_payload, done) {
      console.log("query user")

      console.log(jwt_payload)
      User.findOne(
        {
          id: jwt_payload.id
        },
        function(err, user) {
          if (err) {
            return done(err, false)
          }
          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        }
      )
    }
  )
)

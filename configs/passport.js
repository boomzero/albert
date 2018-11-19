const passport = require("passport")
const ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategy = require("passport-jwt").Strategy
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const jwt = require("jsonwebtoken")
const randomstring = require("randomstring")

const User = require("../api/models/user")
const authConfigs = require("../configs/constants").auth


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
      }, {
        password: true
      }).exec((err, user) => { // include password in query for validation
        if (!user || !user.validatePassword(password)) return done(null, false)
        token = jwt.sign({}, authConfigs.jwt.SECRET, {
          audience: user.id,
          expiresIn: authConfigs.jwt.EXPIRESIN
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
    secretOrKey: authConfigs.jwt.SECRET
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

passport.use("google", new GoogleStrategy({
    clientID: authConfigs.google.CLIENT_ID,
    clientSecret: authConfigs.google.CLIENT_SECRET,
    callbackURL: authConfigs.google.CALLBACK_URL,
    profileFields: ['id', 'emails', 'name']
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({
        email: profile.emails[0].value
      })

      if (!user) {
        user = await User.create({
          username: profile.emails[0].value,
          password: randomstring.generate(),
          firstName: profile.name.lastName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value
        })
      }

      token = jwt.sign({}, authConfigs.jwt.SECRET, {
        audience: user.id,
        expiresIn: authConfigs.jwt.SECRET
      })
      return done(null, user, token)
    } catch (err) {
      return done(err, false)
    }
  }
))

const express = require('express')
const passport = require('passport')

const userController = require('../controllers/user-controller')


const router = new express.Router()

router.route('/')
  .post(userController.createOne)

router.route('/mine')
  .get(passport.authenticate('jwt'), userController.getOne)
  .put(passport.authenticate('jwt'), userController.updateOne)


module.exports = router

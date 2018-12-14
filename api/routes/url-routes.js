const express = require('express')
const passport = require('passport')

const urlController = require('../controllers/url-controller')


const router = new express.Router()

router.route('/')
  .get(passport.authenticate('jwt'), urlController.getAllOfUser)
  .post(urlController.createOne)

router.route('/:shortened')
  .get(urlController.getOne)
  .post(urlController.validatePassword)
  .put(passport.authenticate('jwt'), urlController.updateOne)
  .delete(passport.authenticate('jwt'), urlController.deleteOne)

router.route('/:shortened/accesses')
  // .get(passport.authenticate('jwt'), urlController.getAccesses)
  .post(urlController.logAccess)


module.exports = router

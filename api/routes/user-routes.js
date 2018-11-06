const express = require('express')

const userController = require('../controllers/user-controller')

const router = new express.Router()

router.route('/')
  .post(userController.createOne)

router.route('/:username')
  .get(userController.getOne)
  .put(userController.updateOne)


module.exports = router

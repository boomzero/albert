const express = require('express')

const urlController = require('../controllers/url-controller')

const router = new express.Router()

router.route('/')
  .post(urlController.createOne)

router.route('/:shortened')
  .get(urlController.getOne)
  .put(urlController.updateOne)
  .delete(urlController.deleteOne)

router.route('/users/:username')
.get(urlController.getAllOfUser)


module.exports = router

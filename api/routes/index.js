const express = require('express')

const userRouter = require('./user-routes')
const urlRouter = require('./url-routes')


const router = new express.Router()

router.route('/')
  .get((req, res) => res.send('API OK'))

router.use('/users', userRouter)
router.use('/urls', urlRouter)


module.exports = router

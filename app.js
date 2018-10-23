const express = require('express')
const next = require('next')

const apiRouter = require('./api/routes')


const port = parseInt(process.env.PORT, 10) || 3000
const mode = process.env.NODE_ENV
const app = next({ dev: mode  !== 'production' })
const nextHandle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.use('/api', apiRouter)
    server.use(nextHandle)

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port} in ${mode} mode`)
    })
  })
  .catch((err) => {
      console.error(err.stack)
      process.exit(1)
  })

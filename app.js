const express = require("express")
const next = require("next")
const logger = require("morgan")
const bodyparser = require("body-parser")
const passport = require("passport")

require("./api/models/db")
require("./configs/passport")
const apiRouter = require("./api/routes")
const serverRouter = require("./server/routes/index")


const port = parseInt(process.env.PORT, 10) || 3000
const mode = process.env.NODE_ENV
const app = next({ dev: mode !== "production" })
const nextHandler = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(logger("dev"))
    server.use(
      bodyparser.urlencoded({ extended: false })
    )
    server.use(bodyparser.json())
    server.use(passport.initialize())  // load passport config

    server.use("/api", apiRouter)
    server.use(serverRouter)
    server.use(nextHandler)

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port} in ${mode} mode`)
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })

const mongoose = require("mongoose")
require("./url")
require("./user")


let dbURI = process.env.DB_URI_DEV || "mongodb://localhost:27017/albert"
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.DB_URI || dbURI
}

mongoose.connect(
  dbURI,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
)

// CONNECTION EVENTS
mongoose.connection.on("connected", () =>
  console.log("Mongoose connected to " + dbURI)
)
mongoose.connection.on("error", err =>
  console.log("Mongoose connection error: " + err)
)
mongoose.connection.on("disconnected", () =>
  console.log("Mongoose disconnected")
)

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through " + msg)
    callback()
  })
}

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () =>
    process.kill(process.pid, "SIGUSR2")
  )
})
// For app termination
process.on("SIGINT", () => {
  gracefulShutdown("App termination", () => process.exit(0))
})
// For Heroku app termination
process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app termination", () => process.exit(0))
})

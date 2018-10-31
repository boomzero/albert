const mongoose = require("mongoose")

const User = require("../api/models/user")
const dbConfig = require("../configs/db")

mongoose.connect(
  dbConfig.dbUrl,
  {
    useNewUrlParser: true
  },
  err => {
    if (err) console.log(err)
    else {
      User.create({
        username: "phong",
        password: "1",
        email: "phong@gmail.com",
        firstName: "Vu",
        lastName: "Phong"
      }).then(function(err) {
        if (err) console.log(err)
        else console.log("generated new user")
      })
    }
  }
)

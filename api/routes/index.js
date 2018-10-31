const express = require("express")

const router = new express.Router()

router.route("/").get((req, res) => res.send("API OK"))

module.exports = router

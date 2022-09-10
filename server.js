require("dotenv").config()

const express = require("express")
const http = require("http")
const WebSocket = require("ws")
const fs = require("fs")

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const buildConstants = require("./utils/buildConstants")

app.use("/", express.static("views"))
require("./socketControllers")(wss)

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname })
})

fs.writeFile("views/constants.js", buildConstants(), function (err) {
  if (err) {
    console.log("Error while create the constants file :", err)
    process.exit(0)
  }
  server.listen(process.env.PORT || 8088, () => {
    console.log(`Server started on port ${server.address().port}`)
  })
})

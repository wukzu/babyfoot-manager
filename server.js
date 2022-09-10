require("dotenv").config()

const express = require("express")
const http = require("http")
const WebSocket = require("ws")

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use("/", express.static("views"))
require("./socketControllers")(wss)

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname })
})

server.listen(process.env.PORT || 8088, () => {
  console.log(`Server started on port ${server.address().port}`)
})
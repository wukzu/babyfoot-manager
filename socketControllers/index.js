const matchesHandlers = require("./matchesHandlers")
const chatHandlers = require("./chatHandlers")
const socketHandlers = require("./socketHandlers")

const { types, actions } = require("../constants/sockets")

module.exports = (wss) => {
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data)
    })
  }

  wss.on("connection", async (ws, req) => {
    const params = req.url.split("?")[1].split("=")

    let pseudo = "Invité"
    if (params[0] === "pseudo") pseudo = params[1]
    ws.pseudo = pseudo

    console.log(`${new Date()} Peer ${pseudo} connected`)

    wss.broadcast(
      JSON.stringify({
        type: types.socket,
        action: actions.clientConnected,
        data: {
          pseudo
        }
      })
    )

    ws.on("message", (msg) => {
      const message = JSON.parse(msg)
      if (message && message.type) {
        switch (message.type) {
          case types.match:
            matchesHandlers(ws, wss, message)
            break
          case types.message:
            chatHandlers(ws, wss, message)
            break
          case types.socket:
            socketHandlers(ws, wss, message)
            break
        }
      }
    })

    ws.on("close", function (reasonCode, description) {
      console.log(`${new Date()} Peer ${ws.pseudo} disconnected`)
      wss.broadcast(
        JSON.stringify({
          type: types.socket,
          action: actions.clientDisconnected,
          data: {
            pseudo
          }
        })
      )
    })
  })
}

const matchesHandlers = require("./matchesHandlers")
const chatHandlers = require("./chatHandlers")
const socketHandlers = require("./socketHandlers")

const { types, actions } = require("../constants/sockets")
const replacePseudo = require("../utils/replacePseudo")

const { broadcast } = require("./senders")

module.exports = (wss) => {
  wss.on("connection", async (ws, req) => {
    const params = req.url.split("?")[1].split("=")

    let pseudo = "Invité"
    if (params[0] === "pseudo") pseudo = params[1]

    pseudo = replacePseudo(pseudo, wss.clients)
    ws.pseudo = pseudo
    console.log(`${new Date()} Peer ${pseudo} connected`)

    broadcast(wss, ws, actions.clientConnected, types.socket, {
      pseudo
    })

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
      broadcast(wss, ws, actions.clientDisconnected, types.socket, {
        pseudo
      })
    })
  })
}

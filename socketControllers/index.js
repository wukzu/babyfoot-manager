const matchesHandlers = require("./matchesHandlers")
const chatHandlers = require("./chatHandlers")

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

    ws.on("message", (msg) => {
      const message = JSON.parse(msg)
      if (message && message.type) {
        switch (message.type) {
          case 'match':
            matchesHandlers(ws, wss, message)
            break
          case 'message':
            chatHandlers(ws, wss, message)
            break
        }
      }
    })
  })
}

const { actions } = require("../constants/sockets")

const { send } = require("./senders")

module.exports = (ws, wss, message) => {
  const getAll = () => {
    const data = []
    wss.clients.forEach(function each(client) {
      data.push({
        pseudo: client.pseudo
      })
    })
    send(ws, actions.getAll, data, message.type)
  }
  switch (message.action) {
    case actions.getAll:
      getAll()
      break
    case actions.getMyPseudo:
      send(
        ws,
        actions.setPseudo,
        {
          pseudo: ws.pseudo,
        },
        message.type
      )
  }
}

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
    send(ws, actions.getAll, data, message)
  }
  switch (message.action) {
    case actions.getAll:
      getAll()
      break
  }
}

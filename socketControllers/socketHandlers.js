const { actions } = require("../constants/sockets")

module.exports = (ws, wss, message) => {
  const send = (action, data) => {
    ws.send(
      JSON.stringify({
        type: message.type,
        action,
        data,
      })
    )
  }

  const getAll = () => {
    const data = []
    wss.clients.forEach(function each(client) {
      data.push({
        pseudo: client.pseudo,
      })
    })
    send(actions.getAll, data)
  }
  switch (message.action) {
    case actions.getAll:
      getAll()
      break
  }
}

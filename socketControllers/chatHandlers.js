const chatModel = require("../models/chat")

module.exports = (ws, wss, message) => {
  const broadcast = (action, data) => {
    wss.broadcast(
      JSON.stringify({
        type: message.type,
        action,
        data
      })
    )
  }

  const send = (action, data) => {
    ws.send(
      JSON.stringify({
        type: message.type,
        action,
        data
      })
    )
  }

  const getAll = async () => {
    const messages = await chatModel.getAll()
    send('get-all', messages.rows)
  }

  const addOne = async () => {
    const data = message.data
    const messages = await chatModel.addOne([
      data.message,
      data.sender,
      new Date(),
    ])
    broadcast('add-one', messages.rows[0])
  }

  if (message.action) {
    switch (message.action) {
      case 'get-all':
        getAll()
        break
      case 'add-one':
        addOne()
        break
    }
  }
}

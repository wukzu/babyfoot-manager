const chatModel = require("../models/chat")

const { actions } = require("../constants/sockets")

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
    send(actions.getAll, messages.rows)
  }

  const addOne = async () => {
    const data = message.data
    const messages = await chatModel.addOne([
      data.message,
      data.sender,
      new Date(),
    ])
    broadcast(actions.addOne, messages.rows[0])
  }

  if (message.action) {
    switch (message.action) {
      case actions.getAll:
        getAll()
        break
      case actions.addOne:
        addOne()
        break
    }
  }
}

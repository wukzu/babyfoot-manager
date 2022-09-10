const chatModel = require("../models/chat")

const { actions } = require("../constants/sockets")
const { broadcast, send } = require("./utils")

module.exports = (ws, wss, message) => {

  const getAll = async () => {
    const messages = await chatModel.getAll()
    send(ws, actions.getAll, messages.rows, message)
  }

  const addOne = async () => {
    const data = message.data
    const messages = await chatModel.addOne([
      data.message,
      data.sender,
      new Date(),
    ])
    broadcast(wss, ws, actions.addOne, messages.rows[0], message)
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

const chatModel = require("../models/chat")

const { actions, types } = require("../constants/sockets")
const errors = require("../constants/errors")
const { broadcast, send } = require("./senders")

module.exports = async (ws, wss, message) => {
  const getAll = async () => {
    const messages = await chatModel.getAll()
    send(ws, actions.getAll, messages.rows, message.type)
  }

  const addOne = async () => {
    const data = message.data
    const messages = await chatModel.addOne([
      data.message,
      data.sender,
      new Date(),
    ])
    broadcast(wss, ws, actions.addOne, message.type, messages.rows[0])
  }

  if (message.action) {
    try {
      switch (message.action) {
        case actions.getAll:
          await getAll()
          break
        case actions.addOne:
          await addOne()
          break
      }
    } catch (err) {
      console.log(
        "message.action] message.type",
        message.action,
        message.type,
        errors[message.type][message.action]
      )
      send(
        ws,
        "",
        { message: errors[message.type][message.action] },
        types.error
      )
    }
  }
}

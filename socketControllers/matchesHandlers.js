const matchesModel = require("../models/matches")

const { actions, types } = require("../constants/sockets")
const errors = require("../constants/errors")

const { broadcast, send } = require("./senders")

module.exports = async (ws, wss, message) => {
  const getAll = async () => {
    const matches = await matchesModel.getAll()
    send(ws, actions.getAll, matches.rows, message.type)
  }

  const addOne = async () => {
    const data = message.data
    const matches = await matchesModel.addOne([
      data.players,
      data.score,
      data.finished,
      new Date(),
      null
    ])
    broadcast(wss, ws, actions.addOne, message.type, matches.rows[0])
  }

  const deleteOne = async () => {
    const matches = await matchesModel.deleteOne(message.data.matchId)
    broadcast(wss, ws, actions.deleteOne, message.type, {
      id: matches.rows[0].id
    })
  }

  const finishOne = async () => {
    const matches = await matchesModel.finishOne(message.data.matchId)
    broadcast(wss, ws, actions.finishOne, message.type, {
      id: matches.rows[0].id
    })
  }

  try {
    switch (message.action) {
      case actions.getAll:
        await getAll()
        break
      case actions.addOne:
        await addOne()
        break
      case actions.deleteOne:
        await deleteOne()
        break
      case actions.finishOne:
        await finishOne()
        break
    }
  } catch (err) {
    send(ws, "", { message: errors[message.type][message.action] }, types.error)
  }
}

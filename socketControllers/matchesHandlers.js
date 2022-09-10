const matchesModel = require("../models/matches")

const { actions } = require("../constants/sockets")

const { broadcast, send } = require("./senders")

let matches = []

module.exports = (ws, wss, message) => {
  const getAll = async () => {
    const matches = await matchesModel.getAll()
    send(ws, actions.getAll, matches.rows, message)
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
    broadcast(
      wss,
      ws,
      actions.deleteOne,
      message.type,
      {
        id: matches.rows[0].id
      }
    )
  }

  const finishOne = async () => {
    const matches = await matchesModel.finishOne(message.data.matchId)
    broadcast(
      wss,
      ws,
      actions.finishOne,
      message.type,
      {
        id: matches.rows[0].id
      }
    )
  }

  switch (message.action) {
    case actions.getAll:
      getAll()
      break
    case actions.addOne:
      addOne()
      break
    case actions.deleteOne:
      deleteOne()
      break
    case actions.finishOne:
      finishOne()
      break
  }
}

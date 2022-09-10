const matchesModel = require("../models/matches")

const { actions } = require("../constants/sockets")

let matches = []

module.exports = (ws, wss, message) => {
  const broadcast = (action, data) => {
    wss.broadcast(
      JSON.stringify({
        type: message.type,
        action,
        data,
        from: ws.pseudo || "unknown",
      })
    )
  }

  const send = (action, data) => {
    ws.send(
      JSON.stringify({
        type: message.type,
        action,
        data,
      })
    )
  }
  const getAll = async () => {
    const matches = await matchesModel.getAll()
    send(actions.getAll, matches.rows)
  }

  const addOne = async () => {
    const data = message.data
    const matches = await matchesModel.addOne([
      data.players,
      data.score,
      data.finished,
      new Date(),
      null,
    ])
    broadcast(actions.addOne, matches.rows[0])
  }

  const deleteOne = async () => {
    const matches = await matchesModel.deleteOne(message.data.matchId)
    broadcast(actions.deleteOne, {
      id: matches.rows[0].id,
    })
  }

  const finishOne = async () => {
    const matches = await matchesModel.finishOne(message.data.matchId)
    broadcast(actions.finishOne, {
      id: matches.rows[0].id,
    })
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

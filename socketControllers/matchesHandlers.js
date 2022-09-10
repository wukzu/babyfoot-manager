const matchesModel = require("../models/matches")

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
    send("get-all", matches.rows)
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
    broadcast("add-one", matches.rows[0])
  }

  const deleteOne = async () => {
    const matches = await matchesModel.deleteOne(message.data.matchId)
    broadcast("delete-one", {
      id: matches.rows[0].id,
    })
  }

  const finishOne = async () => {
    const matches = await matchesModel.finishOne(message.data.matchId)
    broadcast("finish-one", {
      id: matches.rows[0].id,
    })
  }

  switch (message.action) {
    case "get-all":
      getAll()
      break
    case "add-one":
      addOne()
      break
    case "delete-one":
      deleteOne()
      break
    case "finish-one":
      finishOne()
      break
  }
}

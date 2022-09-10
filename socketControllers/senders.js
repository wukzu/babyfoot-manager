module.exports = {
  broadcast: (wss, ws, action, type, data) => {
    wss.clients.forEach(function each(client) {
      client.send(
        JSON.stringify({
          type,
          action,
          data,
          from: ws.pseudo || "Inconnu"
        })
      )
    })
  },
  send: (ws, action, data, type) => {
    ws.send(
      JSON.stringify({
        type,
        action,
        data
      })
    )
  }
}

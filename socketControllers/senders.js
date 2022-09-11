module.exports = {
  /**
   * Methods to broadcast a message to all connected clients.
   */
  broadcast: (wss, ws, action, type, data) => {
    wss.clients.forEach(function each(client) {
      client.send(
        JSON.stringify({
          type,
          action,
          data,
          from: ws.pseudo || "Inconnu",
        })
      )
    })
  },
  /**
   * Methods to send a socket to the current client.
   */
  send: (ws, action, data, type) => {
    ws.send(
      JSON.stringify({
        type,
        action,
        data,
      })
    )
  },
}

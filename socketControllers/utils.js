module.exports = {
  broadcast: (wss, ws, action, data, message) => {
    wss.broadcast(
      JSON.stringify({
        type: message.type,
        action,
        data,
        from: ws.pseudo || 'Inconnu'
      })
    )
  },
  send: (ws, action, data, message) => {
    ws.send(
      JSON.stringify({
        type: message.type,
        action,
        data
      })
    )
  }
}
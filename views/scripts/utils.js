import constants from "../constants.js"

const parseDate = (dateIso) => {
  var options = { hour: "2-digit", minute: "2-digit" }
  const date = new Date(dateIso.slice(0, -1))
  return date.toLocaleTimeString("fr-FR", options)
}

const getHistoryText = (obj) => {
  const from = obj.from || obj.data.sender || obj.data.pseudo || "Inconnu"

  const actionsToText = {
    [constants.sockets.actions.addOne]: "a ajouté",
    [constants.sockets.actions.finishOne]: "a marqué comme fini",
    [constants.sockets.actions.deleteOne]: "a supprimé",
    [constants.sockets.actions.clientConnected]: "s'est connecté",
    [constants.sockets.actions.clientDisconnected]: "s'est déconnecté"
  }

  const typeToText = {
    [constants.sockets.types.match]: "un match",
    [constants.sockets.types.message]: "un message"
  }

  const actionsToColor = {
    [constants.sockets.actions.clientConnected]: "green",
    [constants.sockets.actions.clientDisconnected]: "red"
  }

  // Avoid an action we do not want to add to history
  if(!actionsToText[obj.action]) return null
  
  return `<span style="color: ${actionsToColor[obj.action]};">[${parseDate(
    new Date().toString()
  )}] <b>${from}</b>  ${actionsToText[obj.action]} ${
    typeToText[obj.type] || ""
  }</span> `
}

export default {
  parseDate,
  getHistoryText
}

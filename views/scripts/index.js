import Socket from "./classes/Socket.js"
import socketControllers from "./socketsControllers/index.js"

import matchesActions from "./actions/matches.js"
import modalsActions from "./actions/modals.js"
import chatActions from "./actions/chat.js"

import constants from "../constants.js"

var btn = document.getElementById("btnChoosePseudo")

btn.onclick = () => {
  modalsActions.choosePseudo(async (pseudo) => {
    await Socket.connection(
      `ws://localhost:${constants.port}/ws?pseudo=${pseudo}`
    )

    Socket.send({
      type: constants.sockets.types.match,
      action: constants.sockets.actions.getAll,
    })
    Socket.send({
      type: constants.sockets.types.message,
      action: constants.sockets.actions.getAll,
    })
    Socket.send({
      type: constants.sockets.types.socket,
      action: constants.sockets.actions.getAll,
    })

    Socket.send({
      type: constants.sockets.types.socket,
      action: constants.sockets.actions.getMyPseudo
    })

    Socket.ws.onmessage = socketControllers
  })
}

window.addEventListener("load", async () => {
  modalsActions.showPseudoModal()
})

window.filterFinishedMatches = matchesActions.filterFinishedMatches

window.addOneMatch = matchesActions.addOneMatch
window.deleteOneMatch = matchesActions.deleteOneMatch
window.finishOneMatch = matchesActions.finishOneMatch

window.showAddModal = modalsActions.showAddModal
window.hideAddModal = modalsActions.hideAddModal

window.sendMessage = chatActions.sendMessage

window.onclick = (event) => {
  let modal = document.getElementById("modal-add")
  if (event.target == modal) {
    modal.style.display = "none"
  }
}

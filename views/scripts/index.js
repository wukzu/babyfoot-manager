import Socket from "./classes/Socket.js"
import socketControllers from "./socketsControllers/index.js"

import matchesActions from "./actions/matches.js"
import modalsActions from "./actions/modals.js"
import chatActions from "./actions/chat.js"

var btn = document.getElementById("btnChoosePseudo")

btn.onclick = () => {
  modalsActions.choosePseudo(async (pseudo) => {
    await Socket.connection("ws://localhost:3000/ws?pseudo=" + pseudo)
    Socket.setPseudo(pseudo)
    Socket.send({
      type: "match",
      action: "get-all"
    })
    Socket.send({
      type: "message",
      action: "get-all"
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

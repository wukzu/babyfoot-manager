import Socket from "../classes/Socket.js"
import Matches from "../classes/Matches.js"
import refreshViews from "../refreshViews.js"

import modalActions from "./modals.js"

const addOneMatch = () => {
  const firstPlayer = document.getElementById("firstPlayer")
  const secondPlayer = document.getElementById("secondPlayer")
  const modalError = document.getElementById("modal-error")
  modalError.innerHTML = ""

  if (!firstPlayer.value || !secondPlayer.value) {
    modalError.innerHTML = "veuillez remplir tous les champs"
    return
  }

  const messageBody = {
    type: "match",
    action: "add-one",
    data: {
      players: [firstPlayer.value, secondPlayer.value],
      score: [0, 0],
      finished: false
    },
  }
  Socket.send(messageBody)
  modalActions.hideAddModal()
}

const deleteOneMatch = (element) => {
  let matchId = element.getAttribute("matchId")
  const messageBody = {
    type: "match",
    action: "delete-one",
    data: {
      matchId
    }
  }
  Socket.send(messageBody)
}

const finishOneMatch = (element) => {
  let matchId = element.getAttribute("matchId")
  const messageBody = {
    type: "match",
    action: "finish-one",
    data: {
      matchId
    }
  }
  Socket.send(messageBody)
}

const filterFinishedMatches = () => {
  const finishedCheckbox = document.getElementById("finished-matches")
  if (finishedCheckbox.checked) {
    refreshViews.refreshMatchesView(
      Matches.games.filter((match) => match.finished)
    )
  } else {
    refreshViews.refreshMatchesView()
  }
}

export default {
  addOneMatch,
  deleteOneMatch,
  finishOneMatch,
  filterFinishedMatches
}

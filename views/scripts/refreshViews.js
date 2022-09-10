import Matches from "./classes/Matches.js"
import Chat from "./classes/Chat.js"
import Socket from "./classes/Socket.js"

import utils from "./utils.js"

const scrollToBottom = (elementId, timeout = 10) => {
  setTimeout(() => {
    let elementScroller = document.getElementById(elementId)
    elementScroller.scroll({
      top: elementScroller.scrollHeight,
      behavior: "smooth"
    })
  }, timeout)
}

const refreshMatchesView = (filter = null) => {
  let matchesDiv = document.querySelector("#matches")
  matchesDiv.innerHTML = ""
  for (const match of filter || Matches.games) {
    matchesDiv.innerHTML += `<div class="match">
      <div>
        <div>
          <span>
            <b>${match.players[0]} VS ${match.players[1]}</b>
          </span> 
          <span class="chip">
            ${match.score[0]}-${match.score[1]}
          </span>
        </div>
      </div>
      <div>
        ${
          !match.finished
            ? "<button class='primary dense' matchId='" +
              match.id +
              "' onclick='finishOneMatch(this)' >Finir</button>"
            : "<span class='success dense'>Fini</span>"
        }
        <button class="grey dense" matchId="${
          match.id
        }" onclick="deleteOneMatch(this)">
          Supprimer
        </button>
      <div>
    </div>`
  }
  scrollToBottom("matches-scroller")
}

const refreshChat = () => {
  let chatContent = document.getElementById("chat-content")
  chatContent.innerHTML = ""

  const messages = Chat.messages.sort(function (a, b) {
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
  })

  for (const message of messages) {
    const me = message.sender == Socket.pseudo
    chatContent.innerHTML += `<div class="msg ${me ? "sent" : "received"}">
    <span class="info">${
      message.sender == Socket.pseudo ? "Vous" : message.sender
    } - ${utils.parseDate(message.created_at)}</span>
     ${message.body}</div>`
  }
  scrollToBottom("chat-scroller")
}

const refreshHistory = (obj) => {
  const avoidActions = ["get-all"]
  const avoidType = ["message"]

  var historyList = document.getElementById("history-list")

  if (!avoidActions.includes(obj.actions) || !avoidType.includes(obj.type)) {
    var newHistory = document.createElement("li")
    newHistory.classList.add("item")
    newHistory.innerHTML = utils.getHistoryText(obj)

    historyList.appendChild(newHistory)
    setTimeout(function () {
      newHistory.className = newHistory.className + " show"
    }, 10)
  }
  scrollToBottom("history-scroller", 50)
}

const refreshUsers = () => {
  var usersList = document.getElementById("users-list")
  usersList.innerHTML = ""
  for (const user of Socket.users) {
    usersList.innerHTML += `
    <li>${user.pseudo} ${Socket.pseudo === user.pseudo ? "(Vous)" : ""}</li>
    `
  }
}

export default {
  refreshMatchesView,
  refreshChat,
  refreshHistory,
  refreshUsers,
}

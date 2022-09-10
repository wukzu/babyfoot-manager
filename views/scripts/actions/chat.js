import Socket from "../classes/Socket.js"
import constants from "../../constants.js"

const sendMessage = () => {
  const chatInput = document.getElementById("chat-input")

  if (chatInput.value) {
    const messageBody = {
      type: constants.sockets.types.message,
      action: constants.sockets.actions.addOne,
      data: {
        message: chatInput.value,
        sender: Socket.pseudo
      }
    }
    Socket.send(messageBody)
    chatInput.value = ""
  }
}

export default {
  sendMessage
}

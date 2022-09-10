import Socket from "../classes/Socket.js"

const sendMessage = () => {
  const chatInput = document.getElementById("chat-input")

  const messageBody = {
    type: "message",
    action: "add-one",
    data: {
      message: chatInput.value,
      sender: Socket.pseudo
    }
  }
  Socket.send(messageBody)
  chatInput.value = ""
}

export default {
  sendMessage
}
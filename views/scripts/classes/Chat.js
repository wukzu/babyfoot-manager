class Chat {
  constructor() {
    this.messages = []
  }

  setMessages(messages) {
    this.messages = [...messages]
  }

  add(message) {
    this.messages.push(message)
  }
}

const chat = new Chat()
export default chat

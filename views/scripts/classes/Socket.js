class Socket {
  constructor() {
    ;(this.ws = null), (this.pseudo = null), (this.users = [])
  }

  setPseudo(pseudo) {
    this.pseudo = pseudo
  }

  setUsers(users) {
    this.users = users
  }

  addUser(user) {
    this.users.push(user)
  }

  removeUser(pseudo) {
    this.users = this.users.filter((user) => user.pseudo !== pseudo)
  }

  async connection(url) {
    this.ws = await this._connectToServer(url)
  }

  async _connectToServer(url) {
    const ws = new WebSocket(url)
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(timer)
          resolve(ws)
        }
      }, 10)
    })
  }

  send(message) {
    this.ws.send(JSON.stringify(message))
  }
}

const webSocket = new Socket()
export default webSocket

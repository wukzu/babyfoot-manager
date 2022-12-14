import refreshViews from "../refreshViews.js"

import constants from "../../constants.js"

import Socket from "../classes/Socket.js"

export default (messageObj) => {
  if (messageObj.action && messageObj.data) {
    switch (messageObj.action) {
      case constants.sockets.actions.getAll:
        Socket.setUsers(messageObj.data)
        break
      case constants.sockets.actions.clientConnected:
        Socket.addUser({
          pseudo: messageObj.data.pseudo,
        })
        break
      case constants.sockets.actions.clientDisconnected:
        Socket.removeUser(messageObj.data.pseudo)
        break
      case constants.sockets.actions.setPseudo:
        Socket.setPseudo(messageObj.data.pseudo)
        break
    }
  }

  refreshViews.refreshUsers()
}

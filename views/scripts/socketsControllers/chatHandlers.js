import Chat from "../classes/Chat.js"
import refreshViews from "../refreshViews.js"

import constants from "../../constants.js"

export default (messageObj) => {
  if (messageObj.action) {
    switch (messageObj.action) {
      case constants.sockets.actions.getAll:
        Chat.setMessages(messageObj.data)
        break
      case constants.sockets.actions.addOne:
        Chat.add(messageObj.data)
        break
    }
  }
  refreshViews.refreshChat()
}

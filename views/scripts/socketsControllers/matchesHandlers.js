import Matches from "../classes/Matches.js"
import refreshViews from "../refreshViews.js"

import constants from "../../constants.js"

export default (messageObj) => {
  if (messageObj.action && messageObj.data) {
    switch (messageObj.action) {
      case constants.sockets.actions.getAll:
        Matches.set(messageObj.data)
        break

      case constants.sockets.actions.addOne:
        Matches.add(messageObj.data)
        break

      case constants.sockets.actions.finishOne:
        Matches.finishOne(messageObj.data.id)
        break

      case constants.sockets.actions.deleteOne:
        Matches.deleteOne(messageObj.data.id)
        break

      case constants.sockets.actions.update:
        Matches.set(messageObj.data)
        break
    }
    refreshViews.refreshMatchesView()
  }
}

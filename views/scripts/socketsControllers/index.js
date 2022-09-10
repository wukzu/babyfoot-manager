import matchesHandlers from "./matchesHandlers.js"
import chatHandlers from "./chatHandlers.js"
import socketHandlers from "./socketHandlers.js"
import refreshViews from "../refreshViews.js"
import History from "../classes/history.js"

import constants from "../../constants.js"

export default (message) => {
  const obj =
    typeof message.data === "string" ? JSON.parse(message.data) : message.data
  switch (obj.type) {
    case constants.sockets.types.match:
      matchesHandlers(obj)
      break
    case constants.sockets.types.message:
      chatHandlers(obj)
      break
    case constants.sockets.types.socket:
      socketHandlers(obj)
      break
  }
  History.add(obj)
  refreshViews.refreshHistory(obj)
}

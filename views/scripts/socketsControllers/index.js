import matchesHandlers from "./matchesHandlers.js"
import chatHandlers from "./chatHandlers.js"
import refreshViews from "../refreshViews.js"
import History from "../classes/history.js"

export default (message) => {
  const obj =
    typeof message.data === "string" ? JSON.parse(message.data) : message.data

  switch (obj.type) {
    case 'match':
      matchesHandlers(obj)
      break
    case 'message':
      chatHandlers(obj)
      break
  }
  History.add(obj)
  refreshViews.refreshHistory(obj)
}

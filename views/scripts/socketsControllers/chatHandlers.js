import Chat from "../classes/Chat.js"
import refreshViews from "../refreshViews.js"

export default (messageObj) => {
  if (messageObj.action) {
    switch (messageObj.action) {
      case "get-all":
        Chat.setMessages(messageObj.data)
        break
      case "add-one":
        Chat.add(messageObj.data)
        break
    }
  }
  refreshViews.refreshChat()
}

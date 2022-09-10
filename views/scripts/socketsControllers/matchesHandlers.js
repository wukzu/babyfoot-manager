import Matches from "../classes/Matches.js"
import refreshViews from "../refreshViews.js"

export default (messageObj) => {
  if (messageObj.action && messageObj.data) {
    switch (messageObj.action) {
      case "get-all":
        Matches.set(messageObj.data)
        break

      case "add-one":
        Matches.add(messageObj.data)
        break

      case "finish-one":
        Matches.finishOne(messageObj.data.id)
        break

      case "delete-one":
        Matches.deleteOne(messageObj.data.id)
        break

      case "update":
        Matches.set(messageObj.data)
        break
    }
    refreshViews.refreshMatchesView()
  }
}

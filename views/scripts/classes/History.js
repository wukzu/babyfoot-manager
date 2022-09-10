class History {
  constructor() {
    this.historyList = []
  }

  setHistory(historyList) {
    this.historyList = [...historyList]
  }

  add(history) {
    this.historyList.push(history)
  }
}

const history = new History()
export default history

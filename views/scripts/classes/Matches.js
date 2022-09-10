class Matches {
  constructor() {
    this.games = []
  }

  set(games) {
    this.games = [...games]
  }

  add(game) {
    this.games.push(game)
  }
  
  finishOne(id) {
    this.games = this.games.map(game => {
      return {
        ...game,
        finished: game.id == id ? true : game.finished
      }
    })
  }

  deleteOne(id) {
    this.games = this.games.filter(game => game.id !== id)
  }

  deleteAll() {
    this.games = []
  }

  getTotal() {
    return this.game.length
  }
}

const matches = new Matches()
export default matches

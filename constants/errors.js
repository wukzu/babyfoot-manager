const { actions, types } = require("./sockets")

module.exports = {
  [types.message]: {
    [actions.addOne]: "Erreur lors de l'ajout d'un message",
    [actions.getAll]: "Erreur lors de la récupération des messages",
  },
  [types.match]: {
    [actions.getAll]: "Erreur lors de la récupération des matchs",
    [actions.addOne]: "Erreur lors de l'ajout d'un match",
    [actions.finishOne]: "Erreur lors de l'arrêt d'un match",
    [actions.deleteOne]: "Erreur lors de la suppression d'un match",
  },
}

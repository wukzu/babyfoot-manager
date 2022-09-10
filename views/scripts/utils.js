const parseDate = (dateIso) => {
  var options = { hour: '2-digit', minute: '2-digit'}
  const date = new Date(dateIso.slice(0, -1))
  return date.toLocaleTimeString("fr-FR", options)
}

const getHistoryText = (obj) => {
  const from = obj.from || obj.data.sender || 'Inconnu'

  const actionsToText = {
    ['get-all']: 'a récupéré',
    ['add-one']: 'a ajouté',
    ['finish-one']: 'a marqué comme fini',
    ['delete-one']: 'a supprimé'
  }
  
  const typeToText = {
    ['match']: 'un match',
    ['message']: 'un message'
  }

  return `[${parseDate(new Date().toString())}] ${from} ${actionsToText[obj.action]} ${typeToText[obj.type]}`
}

export default {
  parseDate,
  getHistoryText
}
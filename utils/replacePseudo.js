/**
 * Methods to modify a pseudo if it already exists.
 * @param {String} pseudo - The pseudo to replace in case of.
 * @param {Array} clients - The clients connected.
 * @return {String} The new pseudo
 */
module.exports = (pseudo, clients) => {
  const existingPseudo = [...clients].find((client) => client.pseudo == pseudo)
  if (existingPseudo) {
    const pseudoRegex = [...clients].filter((client) =>
      client.pseudo
        ? client.pseudo.match(new RegExp(`(${pseudo})_\\d+`))
        : false
    )
    if (!pseudoRegex.length) {
      return `${pseudo}_1`
    } else {
      return `${pseudo}_${
        parseInt(pseudoRegex[pseudoRegex.length - 1].pseudo.split("_")[1]) + 1
      }`
    }
  }
  return pseudo
}

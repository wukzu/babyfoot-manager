require("dotenv").config()
const socketConstants = require("../constants/sockets")

/**
 * Methods to build the constants for the frontend.
 * @return {String} The constants formatted.
 */
module.exports = () => {
  return `
  export default {
    port: ${process.env.PORT || 8088},
    sockets: ${JSON.stringify(socketConstants)}
  }
  `
}

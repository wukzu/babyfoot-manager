require("dotenv").config()
const socketConstants = require("../constants/sockets")

module.exports = () => {
  return `
  export default {
    port: ${process.env.PORT || 8088},
    sockets: ${JSON.stringify(socketConstants)}
  }
  `
}

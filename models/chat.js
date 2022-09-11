const pool = require("../config/database")

/**
 * The model to get all the messages from the database.
 * @return {Object} The result object.
 */
exports.getAll = async () => {
  return await pool.query(`
    SELECT * FROM messages
  `)
}

/**
 * The model to add one messages in the database.
 * @param {Array} values - The values to add.
 * @return {Object} The result object.
 */
exports.addOne = async (values) => {
  return await pool.query(
    `
    INSERT INTO messages 
    (body, sender, created_at)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    values
  )
}

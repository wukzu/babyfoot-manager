const pool = require("../config/database")

exports.getAll = async () => {
  return await pool.query(`
    SELECT * FROM messages
  `)
}

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

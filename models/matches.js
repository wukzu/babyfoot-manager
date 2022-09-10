const pool = require("../config/database")

exports.getAll = async () => {
  return await pool.query(`
    SELECT * FROM matches
  `)
}

exports.addOne = async (values) => {
  return await pool.query(
    `
    INSERT INTO matches 
    (players, score, finished, created_at, finished_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    values
  )
}

exports.finishOne = async (id) => {
  return await pool.query(
    `
    UPDATE matches
    SET finished = 'True'
    WHERE id=$1
    RETURNING *
  `,
    [id]
  )
}

exports.deleteOne = async (id) => {
  return await pool.query(
    `
    DELETE FROM matches
    WHERE id=$1
    RETURNING *
  `,
    [id]
  )
}

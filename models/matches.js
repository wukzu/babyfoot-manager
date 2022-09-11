const pool = require("../config/database")

/**
 * The model to get all the matches from the database.
 * @return {Object} The result object.
 */
exports.getAll = async () => {
  return await pool.query(`
    SELECT * FROM matches
  `)
}

/**
 * The model to add one match in the database.
 * @param {Array} values - The values to add.
 * @return {Object} The result object.
 */
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

/**
 * The model to finish one match in the database.
 * @param {Number} id - The match id to modify.
 * @return {Object} The result object.
 */
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

/**
 * The model to delete one match in the database.
 * @param {Number} id - The match id to delete.
 * @return {Object} The result object.
 */
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

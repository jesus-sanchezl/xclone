const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const getUserCredentialsById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [rows] = await connection.query(
      `
        SELECT id, password
        FROM users
        WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      throw generateError("Usuario no encontrado", 404);
    }

    return rows[0];
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUserCredentialsById;

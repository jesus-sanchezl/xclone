const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const validateUserExists = async (userId) => {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );

        if (rows.length === 0) {
            throw generateError(`El usuario con ID ${userId} no existe`, 404);
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = validateUserExists;

const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const updateIsPrivate = async (userId, isPrivate) => {

    let connection;

    try {
        connection = await getConnection();


        const [rows] = await connection.query(
            "SELECT id FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            throw generateError("Usuario no encontrado", 404);
        }

        const [result] = await connection.query(`
                INSERT INTO privacy_settings (user_id, is_private)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE is_private = ?
            `, [userId, isPrivate, isPrivate])

        return result;
        
    } catch (error) {
        throw error;

    } finally {
        if (connection) connection.release()
    }


}


module.exports = updateIsPrivate;
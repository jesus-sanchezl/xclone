const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const getUserById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.query(
            `
                SELECT 
                    id, 
                    name, 
                    username, 
                    profile_image, 
                    cover_image, 
                    bio, 
                    location, 
                    birthdate, 
                    created_at
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

module.exports = getUserById;

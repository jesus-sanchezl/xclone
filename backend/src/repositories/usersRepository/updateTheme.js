const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const updateTheme = async (userId, theme) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                UPDATE users
                SET theme = ?
                WHERE id = ?
            `,
            [theme, userId]
        );

        if (result.affectedRows === 0) {
            throw generateError("Usuario no encontrado", 404);
        }

        return { theme };
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateTheme;

const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const updateEmail = async (userId, email) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
            UPDATE users
            SET email = ?
            WHERE id = ?
        `,
            [email, userId]
        );

        if (result.affectedRows === 0) {
            throw generateError(
                "No se pudo actualizar el correo electrónico",
                500
            );
        }

        return true;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateEmail;

const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const updatePasswordById = async (id, password) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                UPDATE users
                SET password = ?
                WHERE id = ?
            `,
            [password, id]
        );

        if (result.affectedRows === 0) {
            throw generateError(
                "No se ha podido actualizar la contraseña",
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

module.exports = updatePasswordById;

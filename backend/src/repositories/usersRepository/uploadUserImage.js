const { generateError } = require("../../utils/helpers.js");
const { getConnection } = require("../../database/database");

const uploadUserImage = async (userId, imageName) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                UPDATE users
                SET profile_image = ?
                WHERE id = ?
            `,
            [imageName, userId]
        );

        if (result.affectedRows === 0) {
            throw generateError(
                "No se pudo actualizar la imagen. Usuario no encontrado.",
                404
            );
        }

        return true;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = uploadUserImage;

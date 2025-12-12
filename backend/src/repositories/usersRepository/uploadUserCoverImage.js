const { getConnection } = require("../../database/database");
const { generateError } = require("../../utils/helpers");

const uploadUserCoverImage = async (userId, imageName) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                UPDATE users
                SET cover_image = ?
                WHERE id = ?
            `,
            [imageName, userId]
        );

        if (result.affectedRows === 0) {
            throw generateError(
                "No se pudo actualizar la imagen de portada. Usuario no encontrado.",
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

module.exports = uploadUserCoverImage;

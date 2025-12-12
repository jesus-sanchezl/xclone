const { generateError } = require("../../utils/helpers");
const { getConnection } = require("../../database/database");

const saveResetToken = async (userId, tokenHash, expiryDate) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            
            `
                UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?
            `,
            [tokenHash, expiryDate, userId]
        );

        if (result.affectedRows === 0) {
            throw generateError(
                "Usuario no encontrado. No se pudo guardar el token de recuperación.",
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

module.exports = saveResetToken;

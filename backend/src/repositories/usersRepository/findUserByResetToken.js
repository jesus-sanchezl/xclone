const { getConnection } = require("../../database/database");

const findUserByResetToken = async (tokenHash) => {
    let connection;
    try {
        connection = await getConnection();

        const [rows] = await connection.query(
            `
                SELECT 
                    id AS user_id, 
                    reset_token_expiry
                FROM users 
                WHERE reset_token = ?
            `,
            [tokenHash]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = findUserByResetToken;

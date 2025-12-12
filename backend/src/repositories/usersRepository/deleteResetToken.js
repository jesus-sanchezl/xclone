const { getConnection } = require("../../database/database");


const deleteResetToken = async (tokenHash) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                UPDATE users 
                SET reset_token = NULL, 
                    reset_token_expiry = NULL 
                WHERE reset_token = ?
            `,
            [tokenHash]
        );

    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteResetToken;

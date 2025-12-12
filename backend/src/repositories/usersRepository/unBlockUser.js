const { getConnection } = require("../../database/database");

const unblockUser = async (userId, blockedUserId) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
            DELETE FROM blocked_users
            WHERE user_id = ? AND blocked_user_id = ?;
        `,
            [userId, blockedUserId]

        );
        
        return { unblocked: true };
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = unblockUser;

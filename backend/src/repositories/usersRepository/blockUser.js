
const { getConnection } = require("../../database/database");

const blockUser = async (userId, blockedUserId) => {
    let connection;

    try {
        connection = await getConnection();


        await connection.query(
            `
                INSERT INTO blocked_users (user_id, blocked_user_id)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP;
            `,
            [userId, blockedUserId]
        );

        return { blocked: true };
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = blockUser;

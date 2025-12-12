const { getConnection } = require("../../database/database");

const getUserNotifications = async (userId) => {
    let connection;

    try {
        connection = await getConnection();

        const [notifications] = await connection.query(
            `
                SELECT 
                    n.id, 
                    n.type, 
                    n.source_user_id AS sourceUserId, 
                    u.username AS sourceUsername, 
                    n.tweet_id AS tweetId, 
                    n.comment_id AS commentId, 
                    n.created_at AS createdAt, 
                    n.read_at AS readAt
                FROM notifications n
                JOIN users u ON n.source_user_id = u.id
                WHERE n.user_id = ?
                ORDER BY n.created_at DESC
            `,
            [userId]
        );

        return notifications;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUserNotifications;

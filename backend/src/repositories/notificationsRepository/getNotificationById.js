const { getConnection } = require("../../database/database");

const getNotificationById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT 
                    id, 
                    user_id AS userId, 
                    type, 
                    source_user_id AS sourceUserId, 
                    tweet_id AS tweetId, 
                    comment_id AS commentId, 
                    created_at AS createdAt
                FROM notifications
                WHERE id = ?
            `,
            [id]
        );

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getNotificationById;

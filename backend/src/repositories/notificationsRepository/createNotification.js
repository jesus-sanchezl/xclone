const { getConnection } = require("../../database/database");

const createNotification = async (
    userId,
    type,
    sourceUserId,
    tweetId = null,
    commentId = null
) => {
    let connection;

    try {
        connection = await getConnection();

        const [ result ] = await connection.query(
            `
            INSERT INTO notifications (user_id, type, source_user_id, tweet_id, comment_id, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
                
            `,
            [userId, type, sourceUserId, tweetId, commentId]
        );

        return result.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createNotification;

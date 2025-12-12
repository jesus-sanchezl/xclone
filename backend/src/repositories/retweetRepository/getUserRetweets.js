const { getConnection } = require("../../database/database");

const getUserRetweets = async (user_id) => {
    let connection;

    try {
        connection = await getConnection();

        const [retweets] = await connection.query(
            `
                SELECT 
                    t.id AS tweetId, 
                    t.content, 
                    t.media_url, 
                    t.created_at, 
                    u.id AS author_id, 
                    u.username AS author_username, 
                    u.profile_image AS author_profile_image,
                    r.created_at AS retweetedAt
                FROM retweets r
                JOIN tweets t ON r.tweet_id = t.id
                JOIN users u ON t.user_id = u.id
                WHERE r.user_id = ?
                ORDER BY r.created_at DESC
            `,
            [user_id]
        );

        return retweets;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUserRetweets;

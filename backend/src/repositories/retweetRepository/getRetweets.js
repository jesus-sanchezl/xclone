const { getConnection } = require("../../database/database");

const getRetweets = async (tweetId) => {
    let connection;

    try {
        connection = await getConnection();

        const [retweets] = await connection.query(
            `
                SELECT 
                    r.user_id,
                    u.username,
                    u.profile_image,
                    r.created_at,
                    t.id AS tweetId,
                    t.content,
                    t.media_url
                FROM retweets r
                JOIN users u ON r.user_id = u.id
                JOIN tweets t ON r.tweet_id = t.id
                WHERE r.tweet_id = ?
                ORDER BY r.created_at DESC
            `,
            [tweetId]
        );

        return retweets;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getRetweets;

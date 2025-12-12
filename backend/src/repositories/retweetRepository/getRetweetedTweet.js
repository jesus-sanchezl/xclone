const { getConnection } = require("../../database/database");

const getRetweetedTweet = async (userId, tweetId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                SELECT 
                    id,
                    user_id,
                    tweet_id,
                    created_at
                FROM retweets 
                WHERE user_id = ? AND tweet_id = ?
        `,
            [userId, tweetId]
        );

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getRetweetedTweet;

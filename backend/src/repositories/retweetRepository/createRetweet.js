const { getConnection } = require("../../database/database");

const createRetweet = async (userId, tweetId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                INSERT INTO retweets (user_id, tweet_id, created_at) VALUES (?, ?, NOW())
            `,
            [userId, tweetId]
        );

        return result.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createRetweet;

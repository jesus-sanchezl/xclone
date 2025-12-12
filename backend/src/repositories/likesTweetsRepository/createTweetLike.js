const { getConnection } = require("../../database/database");

const createTweetLike = async (userId, tweetId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                INSERT INTO tweet_likes (user_id, tweet_id)
                VALUES (?, ?)
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

module.exports = createTweetLike;

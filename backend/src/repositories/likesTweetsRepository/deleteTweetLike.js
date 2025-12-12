const { getConnection } = require("../../database/database");

const deleteTweetLike = async (userId, tweetId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                DELETE FROM tweet_likes WHERE user_id = ? AND tweet_id = ?
            `,
            [userId, tweetId]
        );

        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteTweetLike;

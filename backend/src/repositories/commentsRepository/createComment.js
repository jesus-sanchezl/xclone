const { getConnection } = require("../../database/database");

const createComment = async (userId, tweetId, content, mediaName) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                INSERT INTO comments (user_id, tweet_id, content, media_url)
                VALUES (?, ?, ?, ?)
            `,
            [userId, tweetId, content, mediaName]
        );

        return result.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createComment;

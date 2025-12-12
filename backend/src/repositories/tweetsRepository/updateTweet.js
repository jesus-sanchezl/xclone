
const { getConnection } = require("../../database/database");

const updateTweet = async (tweetId, content, mediaUrl) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                UPDATE tweets
                SET content = ?, media_url = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `,
            [content, mediaUrl, tweetId]
        );

        return result.affectedRows;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateTweet;

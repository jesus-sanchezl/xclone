const { getConnection } = require("../../database/database");

const associateTweetHashtags = async (tweetId, hashtagIds) => {
    let connection;

    try {
        connection = await getConnection();

        for (const hashtagId of hashtagIds) {
            await connection.query(
                `
                    INSERT IGNORE INTO tweet_hashtags (tweet_id, hashtag_id)
                    VALUES (?, ?)
                `,
                [tweetId, hashtagId]
            );
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = associateTweetHashtags;

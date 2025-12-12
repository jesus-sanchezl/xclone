const { getConnection } = require("../../database/database");

const updateNotificationsSettings = async (userId, settings) => {
    let connection;

    try {
        connection = await getConnection();

        
        const { 
            allow_likes, 
            allow_retweets, 
            allow_follows, 
            allow_comments 
        } = settings;

        await connection.query(
            `
                INSERT INTO notification_settings (user_id, allow_likes, allow_retweets, allow_follows, allow_comments)
                VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                allow_likes = VALUES(allow_likes),
                allow_retweets = VALUES(allow_retweets),
                allow_follows = VALUES(allow_follows),
                allow_comments = VALUES(allow_comments)
            `,
            [
                userId,
                allow_likes,
                allow_retweets,
                allow_follows,
                allow_comments,
            ]
        );

        
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateNotificationsSettings;

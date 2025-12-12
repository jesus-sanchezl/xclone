
const { getConnection } = require("../../database/database");

const createTweet = async (userId, content = null, media_url = null) => {
    
    let connection;

    try {
        connection = await getConnection();

        const [results] = await connection.query(
            `
            INSERT INTO tweets (user_id, content, media_url, created_at, updated_at)
            VALUES (?, ?, ?, NOW(), NOW())
        `,
            [userId, content, media_url]
        );

        return results.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createTweet;

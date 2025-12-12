
const { getConnection } = require("../../database/database");

const getTotalTweets = async (userId) => {
    let connection;

    try {
        connection = await getConnection();

        const [rows] = await connection.query(
            `
                SELECT 
                (SELECT COUNT(*) FROM tweets WHERE user_id = ?) +
                (SELECT COUNT(*) FROM retweets WHERE user_id = ?) AS totalTweets
            `,
            [userId, userId]
        );

        return rows[0].totalTweets;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getTotalTweets;

const { getConnection } = require("../../database/database");

const createFollow = async (followerId, followedId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
            INSERT INTO followers (follower_id, followed_id, created_at)
            VALUES (?, ?, NOW())
            `,
            [followerId, followedId]
        );

        return result.insertId; 
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createFollow;

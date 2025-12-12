const { getConnection } = require("../../database/database");

const getFollowers = async (userId) => {
    let connection;

    try {
        connection = await getConnection();
        const [followers] = await connection.query(
            `
                SELECT 
                    f.follower_id AS id, 
                    u.username, 
                    u.profile_image AS profileImage, 
                    f.created_at AS followedAt
                FROM followers f
                JOIN users u ON f.follower_id = u.id
                WHERE f.followed_id = ?
            `,
            [userId]
        );

        return followers;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getFollowers;

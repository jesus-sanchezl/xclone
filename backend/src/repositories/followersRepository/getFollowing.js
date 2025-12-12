const { getConnection } = require("../../database/database");

const getFollowing = async (userId) => {

    let connection;

    try {
        connection = await getConnection();

        const [following] = await connection.query(
            `
                SELECT 
                    f.followed_id AS id, 
                    u.username, 
                    u.profile_image AS profileImage, 
                    f.created_at AS followedAt
                FROM followers f
                JOIN users u ON f.followed_id = u.id
                WHERE f.follower_id = ?
            `,
            [userId])
        
        return following
         
    } catch (error) {
        throw error;

    } finally {
        if (connection) connection.release();
    }


}

module.exports = getFollowing;
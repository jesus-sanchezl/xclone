const { getConnection } = require("../../database/database");

const getAllHashtags = async () => {
    let connection;

    try {
        connection = await getConnection();

        const [hashtags] = await connection.query(
            `
                SELECT 
                    id, 
                    name, 
                    created_at AS createdAt
                FROM hashtags
                ORDER BY name ASC
            `);

        return hashtags;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getAllHashtags;

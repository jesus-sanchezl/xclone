const { getConnection } = require("../../database/database");

const createOrGetHashtags = async (hashtags) => {
    let connection;

    try {
        connection = await getConnection();

        const hashtagIds = [];

        for (const hashtag of hashtags) {
            const [result] = await connection.query(
                `
                    INSERT INTO hashtags (name, created_at)
                    VALUES (?, NOW())
                    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)
                `,
                [hashtag]
            );

            hashtagIds.push(result.insertId);
        }

        return hashtagIds;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createOrGetHashtags;

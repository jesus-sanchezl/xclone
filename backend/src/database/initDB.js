require("dotenv").config();

const { getConnection } = require("./database");

if (process.env.NODE_ENV === "production") {
    console.error(
        "NO ejecutes initDB en producción. Este script borra todas las tablas de la base de datos."
    );
    process.exit(1);
}

const main = async () => {
    let connection;

    try {
        connection = await getConnection();

        console.log("Conectado a la base de datos.");
        console.log("Borrando tablas ... ");

        await connection.query("DROP TABLE IF EXISTS tweet_hashtags");
        await connection.query("DROP TABLE IF EXISTS hashtags");
        await connection.query("DROP TABLE IF EXISTS comment_likes");
        await connection.query("DROP TABLE IF EXISTS tweet_likes");
        await connection.query("DROP TABLE IF EXISTS notifications");
        await connection.query("DROP TABLE IF EXISTS comments");
        await connection.query("DROP TABLE IF EXISTS retweets");
        await connection.query("DROP TABLE IF EXISTS notification_settings");
        await connection.query("DROP TABLE IF EXISTS blocked_users");
        await connection.query("DROP TABLE IF EXISTS privacy_settings");
        await connection.query("DROP TABLE IF EXISTS tweets");
        await connection.query("DROP TABLE IF EXISTS followers");
        await connection.query("DROP TABLE IF EXISTS users");

        console.log("Tablas eliminadas.");
        console.log("Creando tablas ...");

        await connection.query(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                profile_image VARCHAR(200) NULL DEFAULT NULL,
                cover_image VARCHAR(255) DEFAULT NULL,
                bio TEXT NULL DEFAULT NULL,
                location VARCHAR(100),
                birthdate DATE,
                reset_token VARCHAR(200) NULL DEFAULT NULL,
                reset_token_expiry DATETIME NULL DEFAULT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                theme ENUM('light', 'dark') DEFAULT 'light'
            );
        `);

        await connection.query(`
            CREATE TABLE followers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                follower_id INT NOT NULL,
                followed_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (follower_id, followed_id),
                FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE,
                CONSTRAINT chk_no_self_follow CHECK (follower_id <> followed_id),
                INDEX idx_followers_followed (followed_id)
            );
        `);

        await connection.query(`
            CREATE TABLE tweets (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER NOT NULL,
                content TEXT NULL,
                media_url VARCHAR(255) NULL DEFAULT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                INDEX idx_tweets_user_created (user_id, created_at)
                

            );
        `);

        await connection.query(`
            CREATE TABLE tweet_likes (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER NOT NULL,
                tweet_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE,
                UNIQUE(user_id, tweet_id)
            );
        `);

        await connection.query(`
            CREATE TABLE comments (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER NOT NULL,
                tweet_id INTEGER NOT NULL,
                content TEXT NOT NULL,
                media_url VARCHAR(255) NULL DEFAULT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE
            );
        `);

        await connection.query(`
            CREATE TABLE comment_likes (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER NOT NULL,
                comment_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
                UNIQUE(user_id, comment_id)
            );
        `);

        await connection.query(`
            CREATE TABLE retweets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                tweet_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (user_id, tweet_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE
            );
        `);

        await connection.query(`
            CREATE TABLE notifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,  
                type ENUM('like_tweet', 'like_comment', 'retweet', 'follow', 'mention', 'reply') NOT NULL, 
                source_user_id INT NOT NULL,  -- Usuario que genera la acción (da like, retuitea, sigue, menciona, etc.)
                tweet_id INT NULL DEFAULT NULL,  -- ID del tweet si la notificación está relacionada con un tweet
                comment_id INT NULL DEFAULT NULL, -- ID del comentario si la notificación está relacionada con un comentario
                read_at DATETIME NULL DEFAULT NULL,  -- Cuándo el usuario leyó la notificación
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Cuándo se creó la notificación
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (source_user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE,
                FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
                INDEX idx_notifications_user_created (user_id, created_at)
            );
        `);

        await connection.query(`
            CREATE TABLE notification_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                allow_likes BOOLEAN DEFAULT TRUE,
                allow_retweets BOOLEAN DEFAULT TRUE,
                allow_follows BOOLEAN DEFAULT TRUE,
                allow_comments BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE (user_id)
            );

        `);

        await connection.query(`
            CREATE TABLE privacy_settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                is_private BOOLEAN DEFAULT FALSE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE (user_id)
            );
        `);

        await connection.query(`
            CREATE TABLE blocked_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                blocked_user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (user_id, blocked_user_id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (blocked_user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        await connection.query(`
            CREATE TABLE hashtags (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.query(`
            CREATE TABLE tweet_hashtags (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tweet_id INT NOT NULL,
                hashtag_id INT NOT NULL,
                FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE,
                FOREIGN KEY (hashtag_id) REFERENCES hashtags(id) ON DELETE CASCADE,
                UNIQUE (tweet_id, hashtag_id)
            );
        `);

        console.log("Tablas creadas correctamente.");
    } catch (error) {
        onsole.error("Error al inicializar la base de datos:", error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
};

main();

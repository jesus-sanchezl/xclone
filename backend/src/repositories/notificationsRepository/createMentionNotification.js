const createNotification = require("./createNotification");

const createMentionNotification = async (userId, sourceUserId, tweetId) => {
    return createNotification (userId, "mention", sourceUserId, tweetId, null);
};

module.exports = createMentionNotification;

const createNotification = require("./createNotification");

const createFollowNotification = async (userId, sourceUserId) => {
    return createNotification(userId, "follow", sourceUserId);
};

module.exports = createFollowNotification;

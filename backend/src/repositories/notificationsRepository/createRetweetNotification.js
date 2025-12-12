const createNotification = require("./createNotification")

const createRetweetNotification = async (userId, sourceUserId, tweetId) => {
    return createNotification(userId, 'retweet', sourceUserId, tweetId, null)
}

module.exports = createRetweetNotification;
const createNotification = require("./createNotification");

const createTweetLikeNotification = async (userId, sourceUserId, tweetId) => {
    return createNotification(userId, 'like_tweet', sourceUserId, tweetId, null)

}


module.exports = createTweetLikeNotification;
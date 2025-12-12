const createNotification = require("./createNotification")

const createCommentLikeNotification = async (userId, sourceUserId, commentId) => {

    return createNotification(userId, 'like_comment', sourceUserId, null, commentId)

}


module.exports = createCommentLikeNotification

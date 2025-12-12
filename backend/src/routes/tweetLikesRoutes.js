const express = require("express");

const validateAuth = require("../middlewares/validateAuth");
const unlikeTweetController = require("../controllers/likesTweets/deleteTweetLikeController");

const getUserLikedTweetsController = require("../controllers/likesTweets/getUserLikedTweetsController");
const createTweetLikeController = require("../controllers/likesTweets/createTweetLikeController");
const getUsersWhoLikedTweetController = require("../controllers/likesTweets/getUsersWhoLikedTweetController");

const tweetLikesRoutes = express.Router();

tweetLikesRoutes
    .route("/:id")
    .all(validateAuth)
    .post(createTweetLikeController)
    .delete(unlikeTweetController);

tweetLikesRoutes
    .route("/:id/users")
    .all(validateAuth)
    .get(getUsersWhoLikedTweetController);

tweetLikesRoutes
    .route("/user/:id")
    .all(validateAuth)
    .get(getUserLikedTweetsController);

module.exports = tweetLikesRoutes;

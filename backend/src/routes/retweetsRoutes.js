const express = require("express");
const validateAuth = require("../middlewares/validateAuth");
const createRetweetController = require("../controllers/retweets/createRetweetController");
const deleteRetweetController = require("../controllers/retweets/deleteRetweetController");
const getRetweetsController = require("../controllers/retweets/getRetweetsController");
const getUserRetweetsController = require("../controllers/retweets/getUserRetweetsController");

const retweetsRoutes = express.Router();

retweetsRoutes
    .route("/:tweetId")
    .all(validateAuth)
    .get(getRetweetsController)
    .post(createRetweetController)
    .delete(deleteRetweetController);

retweetsRoutes
    .route("/user/:userId")
    .all(validateAuth)
    .get(getUserRetweetsController);

module.exports = retweetsRoutes;

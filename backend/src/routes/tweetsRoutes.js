const express = require("express");

const getTweetsController = require("../controllers/tweets/getTweetsController");
const newTweetController = require("../controllers/tweets/newTweetController");
const getSingleTweetController = require("../controllers/tweets/getSingleTweetController");
const deleteSingleTweetController = require("../controllers/tweets/deleteSingleTweetController");
const getUserTweetsController = require("../controllers/tweets/getUserTweetsController");
const updateTweetController = require("../controllers/tweets/updateTweetController");
const validateAuth = require("../middlewares/validateAuth");

const tweetsRoutes = express.Router();

tweetsRoutes
    .route("/")
    .all(validateAuth)
    .get(getTweetsController)
    .post(newTweetController);

tweetsRoutes
    .route("/user/:user_id")
    .all(validateAuth)
    .get(getUserTweetsController);

tweetsRoutes
    .route("/:id")
    .all(validateAuth)
    .get(getSingleTweetController)
    .put(updateTweetController)
    .delete(deleteSingleTweetController);

module.exports = tweetsRoutes;

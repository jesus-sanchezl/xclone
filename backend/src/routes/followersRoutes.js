const express = require("express");
const validateAuth = require("../middlewares/validateAuth");
const followUserController = require("../controllers/followers/followUserController");
const unfollowUserController = require("../controllers/followers/unfollowUserController");
const getFollowersController = require("../controllers/followers/getFollowersController");
const getFollowingController = require("../controllers/followers/getFollowingController");

const followersRoutes = express.Router();

followersRoutes
    .route("/following/:userId")
    .all(validateAuth)
    .get(getFollowingController);

followersRoutes.route("/:userId").all(validateAuth).get(getFollowersController);

followersRoutes
    .route("/:followedId")
    .all(validateAuth)
    .post(followUserController)
    .delete(unfollowUserController);

module.exports = followersRoutes;

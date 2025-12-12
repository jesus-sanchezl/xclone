const express = require("express");
const validateAuth = require("../middlewares/validateAuth");
const createCommentLikeController = require("../controllers/likesComments/createCommentLikeController");
const deleteCommentLikeController = require("../controllers/likesComments/deleteCommentLikeController");
const getUsersWhoLikedCommentController = require("../controllers/likesComments/getUsersWhoLikedCommentController");
const commentLikesRoutes = express.Router();

commentLikesRoutes
    .route("/:id")
    .all(validateAuth)
    .post(createCommentLikeController)
    .delete(deleteCommentLikeController);

commentLikesRoutes
    .route("/:id/users")
    .all(validateAuth)
    .get(getUsersWhoLikedCommentController);

module.exports = commentLikesRoutes;

const express = require("express");

const validateAuth = require("../middlewares/validateAuth");
const createCommentByIdTweetController = require("../controllers/comments/createCommentByIdTweetController");
const deleteCommentController = require("../controllers/comments/deleteCommentController");
const getCommentsByTweetIdController = require("../controllers/comments/getCommentsByTweetIdController");
const getSingleCommentController = require("../controllers/comments/getSingleCommentController");

const commentsRoutes = express.Router();

commentsRoutes
    .route("/tweet/:id")
    .all(validateAuth)
    .get(getCommentsByTweetIdController)
    .post(createCommentByIdTweetController);

commentsRoutes
    .route("/:id")
    .all(validateAuth)
    .get(getSingleCommentController)
    .delete(deleteCommentController);

module.exports = commentsRoutes;

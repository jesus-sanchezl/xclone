const express = require("express");
const validateAuth = require("../middlewares/validateAuth");
const getAllHashtagsController = require("../controllers/hashtags/getAllHashtagsController");
const getTweetsByHashtagController = require("../controllers/hashtags/getTweetsByHashtagController");

const hashtagsRoutes = express.Router();


hashtagsRoutes.route("/").all(validateAuth).get(getAllHashtagsController);


hashtagsRoutes
    .route("/:name")
    .all(validateAuth)
    .get(getTweetsByHashtagController);

module.exports = hashtagsRoutes;

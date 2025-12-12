const express = require("express");

const validateAuth = require("../middlewares/validateAuth");
const getUserNotificationsController = require("../controllers/notifications/getUserNotificationsController");
const markNotificationAsReadController = require("../controllers/notifications/markNotificationAsReadController");
const deleteNotificationController = require("../controllers/notifications/deleteNotificationController");
const updateNotificationSettingsController = require("../controllers/notifications/updateNotificationSettingsController");

const notificationsRoutes = express.Router();

notificationsRoutes
    .route("/")
    .all(validateAuth)
    .get(getUserNotificationsController);

notificationsRoutes
    .route("/:id")
    .all(validateAuth)
    .put(markNotificationAsReadController)
    .delete(deleteNotificationController);

notificationsRoutes
    .route("/settings")
    .all(validateAuth)
    .put(updateNotificationSettingsController);

module.exports = notificationsRoutes;

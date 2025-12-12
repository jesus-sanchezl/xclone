const express = require("express");

const registerController = require("../controllers/users/registerController");
const loginController = require("../controllers/users/loginController");
const getUserByIdController = require("../controllers/users/getUserByIdController");
const checkEmailRegisterController = require("../controllers/users/checkEmailRegisterController");
const checkUsernameController = require("../controllers/users/checkUsernameController");
const getUserProfileController = require("../controllers/users/getUserProfileController");

const validateAuth = require("../middlewares/validateAuth");
const updateUserDataController = require("../controllers/users/updateUserDataController");
const updateUserPasswordController = require("../controllers/users/updateUserPasswordController");
const forgotPasswordController = require("../controllers/users/forgotPasswordController");
const resetPasswordController = require("../controllers/users/resetPasswordController");
const getUsersController = require("../controllers/users/getUsersController");

const updateUserImageController = require("../controllers/users/updateUserImageController");
const updateUserCoverImageController = require("../controllers/users/updateUserCoverImageController");
const updateEmailController = require("../controllers/users/updateEmailController");
const updatePrivacySettingsController = require("../controllers/users/updatePrivacySettingsController");
const blockUserController = require("../controllers/users/blockUserController");
const updateThemeController = require("../controllers/users/updateThemeController");
const getTotalTweetsController = require("../controllers/tweets/getTotalTweetsController");
const checkEmailLoginController = require("../controllers/users/checkEmailLoginController");

const usersRoutes = express.Router();

usersRoutes.route("/register").post(registerController);
usersRoutes.route("/check-username").post(checkUsernameController);
usersRoutes.route("/check-email").post(checkEmailRegisterController);
usersRoutes.route("/check-email-login").post(checkEmailLoginController);

usersRoutes.route("/login").post(loginController);
usersRoutes.route("/userinfo").all(validateAuth).get(getUserProfileController);

usersRoutes
    .route("/update-password")
    .all(validateAuth)
    .put(updateUserPasswordController);
usersRoutes.route("/forgot-password").post(forgotPasswordController);
usersRoutes.route("/reset-password").post(resetPasswordController);
usersRoutes.route("/update-email").all(validateAuth).put(updateEmailController);

usersRoutes
    .route("/privacy")
    .all(validateAuth)
    .put(updatePrivacySettingsController);
usersRoutes.route("/block").all(validateAuth).post(blockUserController);

usersRoutes.route("/theme").all(validateAuth).put(updateThemeController);

usersRoutes
    .route("/update-photo")
    .all(validateAuth)
    .put(updateUserImageController);
usersRoutes
    .route("/cover-image")
    .all(validateAuth)
    .put(updateUserCoverImageController);

usersRoutes.route("/me").all(validateAuth).put(updateUserDataController);

usersRoutes.route("/:id").all(validateAuth).get(getUserByIdController);

usersRoutes
    .route("/:userId/tweets/count")
    .all(validateAuth)
    .get(getTotalTweetsController);

usersRoutes.route("/").all(validateAuth).get(getUsersController);

module.exports = usersRoutes;

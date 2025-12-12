require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const usersRoutes = require("./src/routes/usersRoutes");
const tweetsRoutes = require("./src/routes/tweetsRoutes");
const commentsRoutes = require("./src/routes/commentsRoutes");
const followersRoutes = require("./src/routes/followersRoutes");
const retweetsRoutes = require("./src/routes/retweetsRoutes");
const notificationsRoutes = require("./src/routes/notificationsRoutes");
const hashtagsRoutes = require("./src/routes/hashtagsRoutes");
const tweetLikesRoutes = require("./src/routes/tweetLikesRoutes");
const commentLikesRoutes = require("./src/routes/commentLikesRoutes");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use(
    "/api/v1/images",
    express.static(path.join(__dirname, "public/tweetMedia"))
);
app.use(
    "/api/v1/images",
    express.static(path.join(__dirname, "public/commentMedia"))
);
app.use(
    "/api/v1/images",
    express.static(path.join(__dirname, "public/profileImages"))
);
app.use(
    "/api/v1/images",
    express.static(path.join(__dirname, "public/coverImages"))
);

app.use("/api/v1/users", usersRoutes);

app.use("/api/v1/tweets", tweetsRoutes);

app.use("/api/v1/comments", commentsRoutes);

app.use("/api/v1/likes", tweetLikesRoutes);

app.use("/api/v1/likes/comment", commentLikesRoutes);

app.use("/api/v1/followers", followersRoutes);

app.use("/api/v1/retweets", retweetsRoutes);

app.use("/api/v1/notifications", notificationsRoutes);

app.use("/api/v1/hashtags", hashtagsRoutes);

app.use((req, res) => {
    res.status(404).send({
        status: "error",
        message: "Not Found",
    });
});

app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.statusCode || 500).send({
        status: "error",
        message: error.message,
    });
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT} 🌍`);
});

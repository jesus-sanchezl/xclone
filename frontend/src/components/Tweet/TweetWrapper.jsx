import { useContext } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { Box, Typography, Avatar, Card } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";

import { AuthContext } from "../../context/AuthContext";

import { formatLongDate, formatTime } from "../../utils/timeFormatter";

import { Tweet } from "./Tweet";

import defaultImage from "../../assets/default_profile.jpeg";

export const TweetWrapper = ({
    tweet,
    view,
    toggleLike,
    toggleRetweet,
    removeTweet,
    hideActionsOverride,
    showRetweet = false,
}) => {
    const { user } = useContext(AuthContext);
    const isDetail = view === "detail";
    const isFeed = view === "feed";

    return (
        <Card
            sx={{
                borderRadius: 0,
                boxShadow: "none",
                width: "100%",
                bgcolor: "transparent",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": isFeed
                    ? { backgroundColor: "#f7f9f9", cursor: "pointer" }
                    : {},
                px: 2,
                py: 1.5,
            }}
        >
            {showRetweet && tweet.retweeter_id && (
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={1}
                    pl={4}
                    color="text.secondary"
                >
                    <RepeatIcon fontSize="small" />
                    <Typography variant="caption">
                        {user && tweet.retweeter_id === user.id ? (
                            "Reposteaste"
                        ) : (
                            <>
                                <Link
                                    to={`/user/${tweet.retweeter_id}`}
                                    style={{ color: "inherit" }}
                                >
                                    @{tweet.retweeter_username}
                                </Link>{" "}
                                reposteó
                            </>
                        )}
                    </Typography>
                </Box>
            )}

            {isFeed && (
                <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <Link
                        to={`/user/${tweet.user_id}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Avatar
                            src={
                                tweet.profile_image
                                    ? `${import.meta.env.VITE_BACKEND}/images/${
                                          tweet.profile_image
                                      }`
                                    : defaultImage
                            }
                            sx={{ width: 40, height: 40 }}
                        />
                    </Link>

                    <Box flex={1}>
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                            flexWrap="wrap"
                        >
                            <Link
                                to={`/user/${tweet.user_id}`}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Typography
                                    component="span"
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    lineHeight={1}
                                    sx={{
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    {tweet.name}
                                </Typography>
                            </Link>

                            <Link
                                to={`/user/${tweet.user_id}`}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                    lineHeight={1}
                                >
                                    @{tweet.username}
                                </Typography>
                            </Link>

                            <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                lineHeight={1}
                            >
                                &nbsp;· {formatTime(tweet.created_at)}
                            </Typography>
                        </Box>

                        <Tweet
                            tweet={tweet}
                            toggleLike={toggleLike}
                            toggleRetweet={toggleRetweet}
                            removeTweet={removeTweet}
                            hideActions={
                                hideActionsOverride !== undefined
                                    ? hideActionsOverride
                                    : false
                            }
                            isFeed
                        />
                    </Box>
                </Box>
            )}

            {isDetail && (
                <Box>
                    <Box display="flex" alignItems="flex-start" gap={1.5}>
                        <Link
                            to={`/user/${tweet.user_id}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Avatar
                                src={
                                    tweet.profile_image
                                        ? `${
                                              import.meta.env.VITE_BACKEND
                                          }/images/${tweet.profile_image}`
                                        : defaultImage
                                }
                                sx={{ width: 40, height: 40 }}
                            />
                        </Link>

                        <Box>
                            <Link
                                to={`/user/${tweet.user_id}`}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Typography
                                    component="span"
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    sx={{
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    {tweet.name}
                                </Typography>
                            </Link>

                            <br />

                            <Link
                                to={`/user/${tweet.user_id}`}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    @{tweet.username}
                                </Typography>
                            </Link>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                        <Tweet
                            tweet={tweet}
                            toggleLike={toggleLike}
                            toggleRetweet={toggleRetweet}
                            removeTweet={removeTweet}
                            hideActions={
                                hideActionsOverride !== undefined
                                    ? hideActionsOverride
                                    : true
                            }
                            isFeed={false}
                        />
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                    >
                        {formatLongDate(tweet.created_at)}
                    </Typography>
                </Box>
            )}
        </Card>
    );
};

TweetWrapper.propTypes = {
    tweet: PropTypes.object.isRequired,
    view: PropTypes.oneOf(["feed", "detail"]).isRequired,
    toggleLike: PropTypes.func,
    toggleRetweet: PropTypes.func,
    removeTweet: PropTypes.func,
    hideActionsOverride: PropTypes.bool,
    showRetweet: PropTypes.bool,
};

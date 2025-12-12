import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { Card, Box, Avatar, Typography } from "@mui/material";

import { formatTime } from "../../utils/timeFormatter";

import { Comment } from "./Comment";

import defaultImage from "../../assets/default_profile.jpeg";

export const CommentWrapper = ({
    comment,
    removeComment,
    toggleLikeComment,
}) => {
    return (
        <Card
            sx={{
                borderRadius: 0,
                boxShadow: "none",
                width: "100%",
                borderBottom: "1px solid #e6ecf0",
                px: 2,
                py: 1.5,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": { backgroundColor: "#f7f7f7" },
            }}
        >
            <Box display="flex" alignItems="flex-start" gap={1.5}>
                <Link
                    to={`/user/${comment.userId}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Avatar
                        src={
                            comment.profile_image
                                ? `${import.meta.env.VITE_BACKEND}/images/${
                                      comment.profile_image
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
                            to={`/user/${comment.userId}`}
                            onClick={(e) => e.stopPropagation()}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                lineHeight={1}
                                sx={{
                                    "&:hover": { textDecoration: "underline" },
                                }}
                            >
                                {comment.name}
                            </Typography>
                        </Link>

                        <Link
                            to={`/user/${comment.userId}`}
                            onClick={(e) => e.stopPropagation()}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                lineHeight={1}
                            >
                                @{comment.username} ·{" "}
                                {formatTime(comment.createdAt)}
                            </Typography>
                        </Link>
                    </Box>

                    <Comment
                        comment={comment}
                        removeComment={removeComment}
                        toggleLikeComment={toggleLikeComment}
                    />
                </Box>
            </Box>
        </Card>
    );
};

CommentWrapper.propTypes = {
    comment: PropTypes.object.isRequired,
    removeComment: PropTypes.func,
    toggleLikeComment: PropTypes.func,
};

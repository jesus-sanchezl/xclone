import PropTypes from "prop-types";

import { Box, Typography, IconButton, Tooltip, Divider } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export const TweetActionsRow = ({
    tweet,
    onReply,
    onRetweet,
    onToggleLike,
    onDelete,
    canDelete,
    showDividers = false,
    leftInset = 0,
    rightInset = 0,
}) => {
    const cols = canDelete ? 4 : 3;

    return (
        <>
            {showDividers && <Divider sx={{ mx: 1, borderColor: "#e6ecf0" }} />}

            <Box
                sx={{
                    ml: (theme) => theme.spacing(leftInset),
                    mr: (theme) => theme.spacing(rightInset),
                    py: 0.5,
                    color: "text.secondary",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        alignItems: "center",
                    }}
                >
                
                    <Box
                        sx={{
                            flex: "1 0 0",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 0.5,
                            minHeight: 36, 
                            color: "text.secondary",
                            "&:hover": { color: "#1DA1F2" },
                        }}
                    >
                        <Tooltip title="Responder" arrow>
                            <IconButton
                                size="small"
                                sx={{ p: 0.5, color: "inherit" }}
                                onClick={onReply}
                                aria-label="Responder"
                            >
                                <ChatBubbleOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="caption" sx={{ minWidth: 12 }}>
                            {tweet.commentCount || ""}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flex: "1 0 0",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 0.5,
                            color: tweet.hasRetweeted
                                ? "rgb(0,186,124)"
                                : "text.secondary",
                            "&:hover": { color: "rgb(0,186,124)" },
                        }}
                    >
                        <Tooltip title="Repostear" arrow>
                            <IconButton
                                size="small"
                                sx={{ p: 0.5, color: "inherit" }}
                                onClick={onRetweet}
                                aria-label="Repostear"
                            >
                                <RepeatIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="caption" sx={{ minWidth: 12 }}>
                            {tweet.retweetCount || ""}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flex: "1 0 0",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 0.5,
                            color: tweet.hasLiked
                                ? "rgb(249,24,128)"
                                : "text.secondary",
                            "&:hover": { color: "rgb(249,24,128)" },
                        }}
                    >
                        <Tooltip title="Me gusta" arrow>
                            <IconButton
                                size="small"
                                sx={{ p: 0.5, color: "inherit" }}
                                onClick={onToggleLike}
                                aria-label="Me gusta"
                            >
                                {tweet.hasLiked ? (
                                    <FavoriteIcon fontSize="small" />
                                ) : (
                                    <FavoriteBorderIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Typography variant="caption" sx={{ minWidth: 12 }}>
                            {tweet.likeCount ?? ""}
                        </Typography>
                    </Box>

                    {canDelete && (
                        <Box
                            sx={{
                                flex: "1 0 0",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 0.5,
                                color: "text.secondary",
                                "&:hover": { color: "#0f1419" },
                            }}
                        >
                            <Tooltip title="Eliminar tweet" arrow>
                                <IconButton
                                    onClick={onDelete}
                                    size="small"
                                    sx={{ p: 0.5, color: "inherit" }}
                                    aria-label="Eliminar tweet"
                                >
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </Box>

            {showDividers && <Divider sx={{ mx: 1, borderColor: "#e6ecf0" }} />}
        </>
    );
};

TweetActionsRow.propTypes = {
    tweet: PropTypes.object.isRequired,
    onReply: PropTypes.func.isRequired,
    onRetweet: PropTypes.func.isRequired,
    onToggleLike: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    canDelete: PropTypes.bool,
    showDividers: PropTypes.bool,
    leftInset: PropTypes.number,
    rightInset: PropTypes.number,
};

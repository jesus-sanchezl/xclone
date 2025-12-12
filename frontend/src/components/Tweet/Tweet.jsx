import { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import { useTweetsContext } from "../../context/TweetsContext";

import { deleteTweetService } from "../../services/tweet/tweetServices";

import { TweetActionsRow } from "./TweetActionRow";
import { ConfirmationModal } from "../Common/ConfirmationModal";
import { MediaLightbox } from "../Media/MediaLightbox";

export const Tweet = ({
    tweet,
    removeTweet,
    toggleLike,
    toggleRetweet,
    hideActions = false,
}) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    const [lightbox, setLightbox] = useState({
        open: false,
        src: "",
        type: "image",
    });
    const videoRef = useRef(null);

    const { user, token } = useContext(AuthContext);

    const { toggleLike: toggleLikeGlobal, toggleRetweet: toggleRetweetGlobal } =
        useTweetsContext();

    const navigate = useNavigate();

    const isVideoFile = (name = "") => /\.(mp4|mov|webm|ogg)$/i.test(name);

    const mediaUrl = `${import.meta.env.VITE_BACKEND}/images/${
        tweet.media_url
    }`;

    const handleToggleLike = () => {
        if (toggleLike) {
            toggleLike(tweet.id, tweet.hasLiked);
        } else {
            toggleLikeGlobal(tweet.id, tweet.hasLiked);
        }
    };

    const handleDeleteTweet = async (id) => {
        try {
            setError("");
            setDeleting(true);
            await deleteTweetService({ id, token });

            if (removeTweet) {
                removeTweet(id);
            } else {
                navigate("/home");
            }

            setConfirmOpen(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setDeleting(false);
        }
    };

    const handleToggleRetweet = () => {
        if (toggleRetweet) {
            toggleRetweet(tweet.id, tweet.hasRetweeted);
        } else {
            toggleRetweetGlobal(tweet.id, tweet.hasRetweeted);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "500px",
                mt: 0.5,
                borderRadius: "12px",
                overflow: "hidden",
            }}
        >
            <Box sx={{ px: 0, pt: 1 }}>
                <Box display="flex" gap={2}>
                    <Box flex={1}>
                        <Box mt={1}>
                            <Link
                                to={`/tweet/${tweet.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Typography
                                    fontSize="0.95rem"
                                    sx={{
                                        whiteSpace: "pre-wrap",
                                        lineHeight: 1.3,
                                        overflowWrap: "anywhere",
                                    }}
                                >
                                    {tweet.content}
                                </Typography>
                            </Link>
                        </Box>

                        {tweet.media_url && (
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    maxWidth: 320,
                                    mt: 1,
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    cursor: "zoom-in",
                                    bgcolor: "transparent",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    if (
                                        isVideoFile(tweet.media_url) &&
                                        videoRef.current
                                    ) {
                                        videoRef.current.pause();
                                        videoRef.current.currentTime = 0; 
                                    }

                                    setLightbox({
                                        open: true,
                                        src: mediaUrl,
                                        type: isVideoFile(tweet.media_url)
                                            ? "video"
                                            : "image",
                                    });
                                }}
                                role="button"
                            >
                                {isVideoFile(tweet.media_url) ? (
                                    <video
                                        ref={videoRef}
                                        src={mediaUrl}
                                        playsInline
                                        preload="metadata"
                                        autoPlay
                                        muted
                                        loop
                                        controls={false}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            display: "block",
                                            maxHeight: 320,
                                            objectFit: "contain",
                                            pointerEvents: "none",
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={mediaUrl}
                                        alt="Tweet media"
                                        loading="lazy"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            display: "block",

                                            objectFit: "contain",
                                            maxHeight: 320,
                                            pointerEvents: "none",
                                        }}
                                    />
                                )}
                            </Box>
                        )}

                        {!hideActions && (
                            <TweetActionsRow
                                tweet={tweet}
                                onReply={() => navigate(`/tweet/${tweet.id}`)}
                                onRetweet={handleToggleRetweet}
                                onToggleLike={handleToggleLike}
                                onDelete={() => setConfirmOpen(true)}
                                canDelete={user && user.id === tweet.user_id}
                                showDividers={false}
                                leftInset={0}
                                rightInset={6}
                            />
                        )}

                        {error && (
                            <Typography variant="body2" color="error" mt={1}>
                                {error}
                            </Typography>
                        )}
                    </Box>
                </Box>

                <MediaLightbox
                    open={lightbox.open}
                    onClose={() => setLightbox((p) => ({ ...p, open: false }))}
                    src={lightbox.src}
                    type={lightbox.type}
                    alt={tweet.content || "Media del tweet"}
                />
            </Box>

            <ConfirmationModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => handleDeleteTweet(tweet.id)}
                title="¿Eliminar este tweet?"
                description="Esta acción no se puede revertir."
                confirmText={deleting ? "Eliminando..." : "Eliminar"}
                cancelText="Cancelar"
                loading={deleting}
                destructive
            />
        </Box>
    );
};

Tweet.propTypes = {
    tweet: PropTypes.object,
    removeTweet: PropTypes.func,
    toggleLike: PropTypes.func,
    toggleRetweet: PropTypes.func,
    hideActions: PropTypes.bool,
};

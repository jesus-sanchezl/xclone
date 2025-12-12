import { useContext, useState } from "react";

import PropTypes from "prop-types";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { AuthContext } from "../../context/AuthContext";

import { deleteCommentService } from "../../services/comment/commentServices";

import { ConfirmationModal } from "../Common/ConfirmationModal";
import { MediaLightbox } from "../Media/MediaLightbox";

export const Comment = ({ comment, removeComment, toggleLikeComment }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");

    const [lightbox, setLightbox] = useState({
        open: false,
        src: "",
        type: "image",
    });

    const openConfirm = () => setConfirmOpen(true);
    const closeConfirm = () => setConfirmOpen(false);

    const { user, token } = useContext(AuthContext);

    const isVideoFile = (name = "") => /\.(mp4|mov|webm|ogg)$/i.test(name);

    const mediaUrl = `${import.meta.env.VITE_BACKEND}/images/${
        comment.media_url
    }`;

    const deleteComment = async (commentId) => {
        try {
            await deleteCommentService({ id: commentId, token });
            removeComment(commentId);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            setDeleting(true);
            await deleteComment(comment.commentId);
            closeConfirm();
        } finally {
            setDeleting(false);
        }
    };

    const handleToggleLike = () => {
        toggleLikeComment(comment.commentId, comment.hasLiked);
    };

    return (
        <Box component="section">
            <Typography
                variant="body1"
                sx={{
                    mt: 1,
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.3,
                    overflowWrap: "anywhere",
                }}
            >
                {comment.content}
            </Typography>

            {comment.media_url && (
                <Box
                    mt={1}
                    sx={{
                        width: 260,
                        maxWidth: "100%",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "zoom-in",
                        bgcolor: "#000",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setLightbox({
                            open: true,
                            src: mediaUrl,
                            type: isVideoFile(comment.media_url)
                                ? "video"
                                : "image",
                        });
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setLightbox({
                                open: true,
                                src: mediaUrl,
                                type: isVideoFile(comment.media_url)
                                    ? "video"
                                    : "image",
                            });
                        }
                    }}
                >
                    {isVideoFile(comment.media_url) ? (
                        <video
                            src={mediaUrl}
                            playsInline
                            preload="metadata"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                objectFit: "contain",
                                backgroundColor: "#000",
                                pointerEvents: "none",
                            }}
                        />
                    ) : (
                        <img
                            src={mediaUrl}
                            alt="Imagen del comentario"
                            loading="lazy"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                objectFit: "contain",
                                backgroundColor: "#000",
                            }}
                        />
                    )}
                </Box>
            )}

            <Box mt={1.5}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                        sx={{
                            color: comment.hasLiked
                                ? "rgb(249,24,128)"
                                : "text.secondary",
                            "&:hover": { color: "rgb(249,24,128)" },
                        }}
                    >
                        <Tooltip title="Me gusta" arrow>
                            <IconButton
                                size="small"
                                sx={{ p: 0.5, color: "inherit" }}
                                onClick={handleToggleLike}
                                aria-label={
                                    comment.hasLiked
                                        ? "Quitar me gusta"
                                        : "Dar me gusta"
                                }
                            >
                                {comment.hasLiked ? (
                                    <FavoriteIcon fontSize="small" />
                                ) : (
                                    <FavoriteBorderIcon fontSize="small" />
                                )}
                            </IconButton>
                        </Tooltip>

                        <Typography variant="caption" sx={{ minWidth: 12 }}>
                            {comment.likeCount || ""}
                        </Typography>
                    </Box>

                    {user && user.id === comment.userId && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "text.secondary",
                                "&:hover": { color: "#0f1419" },
                            }}
                        >
                            <Tooltip title="Eliminar comentario" arrow>
                                <IconButton
                                    size="small"
                                    onClick={openConfirm}
                                    sx={{ p: 0.5, color: "inherit" }}
                                    aria-label="Eliminar comentario"
                                >
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <ConfirmationModal
                                open={confirmOpen}
                                onClose={closeConfirm}
                                onConfirm={handleDeleteConfirm}
                                title="¿Deseas eliminar el comentario?"
                                description="Esta acción no se puede revertir."
                                confirmText={
                                    deleting ? "Eliminando..." : "Eliminar"
                                }
                                cancelText="Cancelar"
                                loading={deleting}
                                destructive
                            />
                        </Box>
                    )}
                </Box>

                {error && (
                    <Typography variant="caption" color="error">
                        {error}
                    </Typography>
                )}
            </Box>

            <MediaLightbox
                open={lightbox.open}
                onClose={() => setLightbox((p) => ({ ...p, open: false }))}
                src={lightbox.src}
                type={lightbox.type}
                alt={comment.content || "Multimedia del comentario"}
            />
        </Box>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
    removeComment: PropTypes.func,
    toggleLikeComment: PropTypes.func,
};

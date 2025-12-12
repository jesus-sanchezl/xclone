import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { AuthContext } from "../context/AuthContext";
import { useTweetsContext } from "../context/TweetsContext";

import { useTweet } from "../hooks/useTweet";
import { useComments } from "../hooks/useComments";

import {
    getSingleTweetService,
    deleteTweetService,
} from "../services/tweet/tweetServices";

import { PageWrapper } from "../components/Layout/PageWrapper";
import { ConfirmationModal } from "../components/Common/ConfirmationModal";
import { TweetWrapper } from "../components/Tweet/TweetWrapper";
import { BackButton } from "../components/Common/BackButton";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { NewComment } from "../components/Comment/NewComment";
import { CommentList } from "../components/Comment/CommentList";
import { TweetActionsRow } from "../components/Tweet/TweetActionRow";
import { CenteredLoader } from "../components/Common/CenteredLoader";

export const TweetPage = () => {
    const { id } = useParams();
    const { user, token } = useContext(AuthContext);

    const {
        tweet,
        setTweet,
        loading: tweetLoading,
        error: tweetError,
        toggleLikeSingleTweet,
    } = useTweet(id);
    const {
        comments,
        loading: commentsLoading,
        error: commentsError,
        addComment,
        removeComment,
        toggleLikeComment,
    } = useComments(id);

    const { updateCommentCount, toggleRetweet } = useTweetsContext();

    const navigate = useNavigate();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const openConfirm = () => setConfirmOpen(true);
    const closeConfirm = () => setConfirmOpen(false);

    const handleDeleteTweetConfirm = async () => {
        try {
            setDeleteError("");
            setDeleting(true);

            await deleteTweetService({ id: tweet.id, token });
            closeConfirm();
            navigate(-1);
        } catch (error) {
            console.error("Error al eliminar el tweet:", error);
            setDeleteError(
                "No se ha podido eliminar el tweet. Inténtalo de nuevo."
            );
        } finally {
            setDeleting(false);
        }
    };

    if (tweetLoading) return <CenteredLoader />;

    if (tweetError) return <ErrorMessage message={tweetError} />;

    const handleAddComment = async (newComment) => {
        try {
            addComment(newComment);

            const updatedTweet = await getSingleTweetService({ token, id });

            setTweet(updatedTweet);

            updateCommentCount(Number(id), updatedTweet.commentCount);
        } catch (error) {
            console.error("Error al recargar el tweet:", error.message);
        }
    };

    const handleRemoveComment = async (commentId) => {
        try {
            removeComment(commentId);

            const updatedTweet = await getSingleTweetService({ token, id });

            setTweet(updatedTweet);

            updateCommentCount(Number(id), updatedTweet.commentCount);
        } catch (error) {
            console.error(
                "Error al recargar el tweet después de eliminar un comentario:",
                error.message
            );
        }
    };

    const handleToggleRetweet = () => {
        toggleRetweet(tweet.id, tweet.hasRetweeted);
    };

    return user ? (
        <PageWrapper>
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    bgcolor: "white",
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <BackButton />
                <Typography variant="subtitle1" fontWeight="bold">
                    Post
                </Typography>
            </Box>

            <TweetWrapper
                tweet={tweet}
                toggleLike={toggleLikeSingleTweet}
                toggleRetweet={handleToggleRetweet}
                view="detail"
            />

            <TweetActionsRow
                tweet={tweet}
                onReply={() => window.scrollTo(0, document.body.scrollHeight)}
                onRetweet={handleToggleRetweet}
                onToggleLike={() =>
                    toggleLikeSingleTweet(tweet.id, tweet.hasLiked)
                }
                onDelete={openConfirm}
                canDelete={user?.id === tweet.user_id}
                showDividers
                leftInset={1}
                rightInset={6}
            />

            {deleteError && <ErrorMessage message={deleteError} />}

            <Box>
                {commentsLoading ? (
                    <Typography color="text.secondary">
                        Cargando comentarios...
                    </Typography>
                ) : commentsError ? (
                    <ErrorMessage message={commentsError} />
                ) : (
                    <>
                        <NewComment
                            addComment={handleAddComment}
                            tweetId={id}
                        />

                        <CommentList
                            comments={comments}
                            removeComment={handleRemoveComment}
                            toggleLikeComment={toggleLikeComment}
                        />
                    </>
                )}
            </Box>

            <ConfirmationModal
                open={confirmOpen}
                onClose={closeConfirm}
                onConfirm={handleDeleteTweetConfirm}
                title="¿Eliminar este tweet?"
                description="Esta acción no se puede revertir."
                confirmText={deleting ? "Eliminando..." : "Eliminar"}
                cancelText="Cancelar"
                loading={deleting}
                destructive
                icon={
                    <DeleteOutlineIcon
                        sx={{ fontSize: 36, color: "error.main" }}
                    />
                }
            />
        </PageWrapper>
    ) : null;
};

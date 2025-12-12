import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import {
    likeCommentService,
    unlikeCommentService,
} from "../services/likes/likeServices";
import { getCommentsByTweetIdService } from "../services/comment/commentServices";

export const useComments = (tweetId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { token } = useContext(AuthContext);

    const loadComments = async () => {
        try {
            setLoading(true);

            const data = await getCommentsByTweetIdService({ tweetId, token });

            setComments(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, [tweetId, token]);

    const addComment = (comment) => {
        setComments((prevComments) => [comment, ...prevComments]);
    };

    const removeComment = (commentId) => {
        setComments((prevComments) =>
            prevComments.filter((comment) => comment.commentId !== commentId)
        );
    };

    const toggleLikeComment = async (commentId, hasLiked) => {
        try {
            if (hasLiked) {
                await unlikeCommentService(commentId, token);
            } else {
                await likeCommentService(commentId, token);
            }

            const updatedComments = await getCommentsByTweetIdService({
                tweetId,
                token,
            });

            setComments(updatedComments);
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        comments,
        loading,
        error,
        addComment,
        removeComment,
        toggleLikeComment,
    };
};

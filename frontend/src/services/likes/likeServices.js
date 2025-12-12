import { httpClient } from "../httpClient";

export const likeTweetService = async (tweetId, token) => {
    const json = await httpClient(`/likes/${tweetId}`, {
        method: "POST",
        token,
        defaultErrorMessage: "No se pudo dar like al tweet.",
    });

    return json;
};

export const unLikeTweetService = async (tweetId, token) => {
    const json = await httpClient(`/likes/${tweetId}`, {
        method: "DELETE",
        token,
        defaultErrorMessage: "No se pudo quitar el like del tweet.",
    });

    return json;
};

export const getLikedTweetsByUserService = async (userId, token) => {
    const json = await httpClient(`/likes/user/${userId}`, {
        token,
        defaultErrorMessage: "No se pudieron cargar los tweets con like.",
    });

    return json.data;
};

export const getUsersWhoLikedTweetService = async (tweetId, token) => {
    const json = await httpClient(`/likes/${tweetId}/users`, {
        token,
        defaultErrorMessage:
            "No se pudieron cargar los usuarios que dieron like.",
    });

    return json.data;
};

export const likeCommentService = async (commentId, token) => {
    const json = await httpClient(`/likes/comment/${commentId}`, {
        method: "POST",
        token,
        defaultErrorMessage: "No se pudo dar like al comentario.",
    });

    return json;
};

export const unlikeCommentService = async (commentId, token) => {
    const json = await httpClient(`/likes/comment/${commentId}`, {
        method: "DELETE",
        token,
        defaultErrorMessage: "No se pudo quitar el like del comentario.",
    });

    return json;
};

export const getUsersWhoLikedCommentService = async (commentId, token) => {
    const json = await httpClient(`/likes/comment/${commentId}/users`, {
        token,
        defaultErrorMessage:
            "No se pudieron cargar los usuarios que dieron like al comentario.",
    });

    return json.data;
};

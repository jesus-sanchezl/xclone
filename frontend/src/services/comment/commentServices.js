import { httpClient } from "../httpClient";

export const getCommentsByTweetIdService = async ({ tweetId, token }) => {
    const json = await httpClient(`/comments/tweet/${tweetId}`, {
        token,
        defaultErrorMessage: "No se pudieron cargar los comentarios.",
    });

    return json.data;
};

export const createCommentService = async ({ tweetId, data, token }) => {
    const json = await httpClient(`/comments/tweet/${tweetId}`, {
        method: "POST",
        token,
        body: data,
        isFormData: true,
        defaultErrorMessage: "No se pudo publicar el comentario.",
    });

    return json.data;
};

export const deleteCommentService = async ({ id, token }) => {
    await httpClient(`/comments/${id}`, {
        method: "DELETE",
        token,
        defaultErrorMessage: "No se pudo borrar el comentario.",
    });
};


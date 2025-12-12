import { httpClient } from "../httpClient";

export const getAllTweetsService = async ({ token }) => {
    const json = await httpClient("/tweets", {
        token,
        defaultErrorMessage: "Error al cargar los tweets.",
    });

    return json.data;
};

export const getSingleTweetService = async ({ token, id }) => {
    const json = await httpClient(`/tweets/${id}`, {
        token,
        defaultErrorMessage: "No se pudo cargar el tweet.",
    });

    return json.data;
};

export const sendTweetService = async ({ data, token }) => {
    const json = await httpClient("/tweets", {
        method: "POST",
        token,
        body: data,
        isFormData: true,
        defaultErrorMessage: "No se pudo publicar el tweet.",
    });

    return json.data;
};

export const deleteTweetService = async ({ id, token }) => {
    await httpClient(`/tweets/${id}`, {
        method: "DELETE",
        token,
        defaultErrorMessage: "No se pudo borrar el tweet.",
    });
};

export const getUserTweetsService = async ({ id, token }) => {
    const json = await httpClient(`/tweets/user/${id}`, {
        token,
        defaultErrorMessage: "No se pudieron cargar los tweets del usuario.",
    });

    return json.data;
};

export const loadTotalTweetsService = async ({ token, userId }) => {
    const json = await httpClient(`/users/${userId}/tweets/count`, {
        token,
        defaultErrorMessage: "No se pudo cargar el número de tweets.",
    });

    return json.data;
};


import { httpClient } from "../httpClient";

export const createRetweetService = async (tweetId, token) => {
    const json = await httpClient(`/retweets/${tweetId}`, {
        method: "POST",
        token,
        defaultErrorMessage: "No se pudo hacer retweet.",
    });

    return json;
};

export const deleteRetweetService = async (tweetId, token) => {
    const json = await httpClient(`/retweets/${tweetId}`, {
        method: "DELETE",
        token,
        defaultErrorMessage: "No se pudo deshacer el retweet.",
    });

    return json;
};

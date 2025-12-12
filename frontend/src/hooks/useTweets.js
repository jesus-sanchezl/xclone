import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    getAllTweetsService,
    getSingleTweetService,
    getUserTweetsService,
} from "../services/tweet/tweetServices";

import {
    createRetweetService,
    deleteRetweetService,
} from "../services/retweet/retweetServices";

import {
    likeTweetService,
    unLikeTweetService,
} from "../services/likes/likeServices";

export const useTweets = (id) => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { token, user } = useContext(AuthContext);

    const loadTweets = async () => {
        try {
            setError("");
            setLoading(true);

            const isUserProfile = Boolean(id);

            const data = isUserProfile
                ? await getUserTweetsService({ id, token })
                : await getAllTweetsService({ token });

            setTweets(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.profile_image) {
            setTweets((prevTweets) =>
                prevTweets.map((tweet) =>
                    tweet.user_id === user.id
                        ? { ...tweet, profile_image: user.profile_image }
                        : tweet
                )
            );
        }
    }, [user?.profile_image]);

    useEffect(() => {
        if (token && user) {
            loadTweets();
        }
    }, [id, token, user]);

    const addTweet = (tweet) => {
        setTweets((prevTweets) => [tweet, ...prevTweets]);
    };

    const removeTweet = (id) => {
        setTweets((prevTweets) =>
            prevTweets.filter((tweet) => tweet.id !== id)
        );
    };

    const globalRemoveTweet = (tweetId) => {
        setTweets((prevTweets) =>
            prevTweets.filter((tweet) => tweet.id !== tweetId)
        );
    };

    const updateCommentCount = (tweetId, updatedCount) => {
        setTweets((prev) =>
            prev.map((tweet) =>
                tweet.id === tweetId
                    ? { ...tweet, commentCount: updatedCount }
                    : tweet
            )
        );
    };

    const toggleLike = async (tweetId, hasLiked) => {
        try {
            if (hasLiked) {
                await unLikeTweetService(tweetId, token);
            } else {
                await likeTweetService(tweetId, token);
            }

            const updatedTweet = await getSingleTweetService({
                token,
                id: tweetId,
            });

            const existingTweet = tweets.find((t) => t.id === tweetId);

            const finalTweet = {
                ...updatedTweet,
                retweeter_id:
                    updatedTweet.retweeter_id ?? existingTweet?.retweeter_id,
                retweeter_username:
                    updatedTweet.retweeter_username ??
                    existingTweet?.retweeter_username,
            };

            updateTweet(finalTweet);
        } catch (error) {
            console.error("Error en toggleLike:", error);
        }
    };

    const updateTweet = (updatedTweet) => {
        setTweets((prevTweets) =>
            prevTweets.map((tweet) =>
                tweet.id === updatedTweet.id ? updatedTweet : tweet
            )
        );
    };

    const toggleRetweet = async (tweetId, hasRetweeted, isOwnProfile) => {
        try {
            if (hasRetweeted) {
                await deleteRetweetService(tweetId, token);
            } else {
                await createRetweetService(tweetId, token);
            }

            const updatedTweet = await getSingleTweetService({
                token,
                id: tweetId,
            });

            if (!hasRetweeted && isOwnProfile) {
                updatedTweet.retweeter_id = user.id;
                updatedTweet.retweeter_username = user.username;
            }

            if (isOwnProfile) {
                setTweets((prevTweets) => {
                    const tweetOriginal = prevTweets.find(
                        (t) => t.id === tweetId
                    );

                    if (hasRetweeted && tweetOriginal?.user_id !== user.id) {
                        return prevTweets.filter((t) => t.id !== tweetId);
                    }

                    return prevTweets.map((t) =>
                        t.id === tweetId ? updatedTweet : t
                    );
                });
            } else {
                updateTweet(updatedTweet);
            }

            return !hasRetweeted;
        } catch (error) {
            console.error("Error en toggleRetweet", error);
        }
    };

    return {
        tweets,
        setTweets,
        loading,
        error,
        addTweet,
        removeTweet,
        globalRemoveTweet,
        updateCommentCount,
        reloadTweets: loadTweets,
        toggleLike,
        updateTweet,
        toggleRetweet,
    };
};

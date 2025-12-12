import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { useTweetsContext } from "../context/TweetsContext";

import {
    likeTweetService,
    unLikeTweetService,
} from "../services/likes/likeServices";
import { getSingleTweetService } from "../services/tweet/tweetServices";

export const useTweet = (id) => {
    const [tweet, setTweet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { token } = useContext(AuthContext);
    const { tweets, updateTweet } = useTweetsContext();

    useEffect(() => {
        const loadTweet = async () => {
            try {
                setLoading(true);

                const tweetExists = tweets.find(
                    (tweet) => tweet.id === Number(id)
                );

                if (tweetExists) {
                    setTweet(tweetExists);
                } else {
                    const data = await getSingleTweetService({ token, id });

                    setTweet(data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) loadTweet();
    }, [id, token, tweets]);

    const toggleLikeSingleTweet = async () => {
        if (!tweet) return;

        try {
            if (tweet.hasLiked) {
                await unLikeTweetService(id, token);
            } else {
                await likeTweetService(id, token);
            }

            const updatedTweet = await getSingleTweetService({ token, id });

            const existingTweet = tweets.find((t) => t.id === Number(id));

            const finalTweet = {
                ...updatedTweet,
                retweeter_id:
                    updatedTweet.retweeter_id ?? existingTweet?.retweeter_id,
                retweeter_username:
                    updatedTweet.retweeter_username ??
                    existingTweet?.retweeter_username,
            };

            setTweet(finalTweet);
            updateTweet(finalTweet);
        } catch (error) {
            console.error("Error en toggleLikeSingleTweet:", error);
        }
    };

    return { tweet, setTweet, loading, error, toggleLikeSingleTweet };
};

import { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { AuthContext } from "../../context/AuthContext";
import { useTweetsContext } from "../../context/TweetsContext";

import { useTweets } from "../../hooks/useTweets";

import { getSingleTweetService } from "../../services/tweet/tweetServices";

import { ErrorMessage } from "../Common/ErrorMessage";
import { CenteredLoader } from "../Common/CenteredLoader";
import { TweetList } from "../Tweet/TweetList";

export const UserTweets = ({ id, setTotalTweets, isOwnProfile }) => {
    const { token } = useContext(AuthContext);

    const {
        tweets,
        loading,
        error,
        removeTweet,
        toggleLike,
        toggleRetweet,
        setTweets,
    } = useTweets(id);

    const {
        updateTweet,
        globalRemoveTweet,
        tweets: globalTweets,
    } = useTweetsContext();

    const [actionError, setActionError] = useState("");

    useEffect(() => {
        setTweets((prevTweets) =>
            prevTweets.map((tweet) => {
                const updatedTweet = globalTweets.find(
                    (t) => t.id === tweet.id
                );
                if (updatedTweet) {
                    return {
                        ...updatedTweet,
                        hasRetweeted:
                            updatedTweet.hasRetweeted || tweet.hasRetweeted,
                        retweeter_id:
                            updatedTweet.retweeter_id ?? tweet.retweeter_id,
                        retweeter_username:
                            updatedTweet.retweeter_username ??
                            tweet.retweeter_username,
                        retweeter_profile_image:
                            updatedTweet.retweeter_profile_image ??
                            tweet.retweeter_profile_image,
                    };
                }
                return tweet;
            })
        );
    }, [globalTweets]);

    const handleRemoveTweet = async (tweetId) => {
        setActionError("");

        try {
            await removeTweet(tweetId);
            setTotalTweets((prev) => Math.max(0, prev - 1));
            globalRemoveTweet(tweetId);
        } catch {
            setActionError("No se pudo eliminar el tweet. Inténtalo de nuevo.");
        }
    };

    const handleToggleLike = async (tweetId, hasLiked) => {
        setActionError("");

        try {
            await toggleLike(tweetId, hasLiked);

            const updatedTweet = await getSingleTweetService({
                token,
                id: tweetId,
            });

            if (updatedTweet) {
                updateTweet(updatedTweet);
            }
        } catch {
            setActionError(
                "No se pudo actualizar el like. Inténtalo de nuevo."
            );
        }
    };

    const handleToggleRetweet = async (tweetId, hasRetweeted) => {
        setActionError("");

        try {
            await toggleRetweet(tweetId, hasRetweeted, isOwnProfile);

            const updatedTweet = await getSingleTweetService({
                token,
                id: tweetId,
            });

            if (updatedTweet) {
                const original = tweets.find((t) => t.id === tweetId);

                updateTweet({
                    ...updatedTweet,
                    retweeter_id: original?.retweeter_id,
                    retweeter_username: original?.retweeter_username,
                    retweeter_profile_image: original?.retweeter_profile_image,
                });
            }
        } catch {
            setActionError(
                "No se pudo actualizar el retweet. Inténtalo de nuevo."
            );
        }
    };

    if (loading) return <CenteredLoader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            {actionError && <ErrorMessage message={actionError} />}

            <TweetList
                tweets={tweets}
                removeTweet={handleRemoveTweet}
                toggleLike={handleToggleLike}
                toggleRetweet={handleToggleRetweet}
                showRetweet={true}
            />
        </>
    );
};

UserTweets.propTypes = {
    id: PropTypes.number,
    setTotalTweets: PropTypes.func,
    isOwnProfile: PropTypes.bool,
};

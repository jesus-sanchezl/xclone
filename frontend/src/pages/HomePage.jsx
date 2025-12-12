import { useContext } from "react";

import { useTweetsContext } from "../context/TweetsContext";
import { AuthContext } from "../context/AuthContext";

import { ErrorMessage } from "../components/Common/ErrorMessage";
import { TweetList } from "../components/Tweet/TweetList";
import { NewTweet } from "../components/Tweet/NewTweet";
import { FeedTabs } from "../components/Feed/FeedTabs";
import { PageWrapper } from "../components/Layout/PageWrapper";
import { CenteredLoader } from "../components/Common/CenteredLoader";

export const HomePage = () => {
    const {
        tweets,
        loading,
        error,
        addTweet,
        removeTweet,
        toggleLike,
        toggleRetweet,
    } = useTweetsContext();

    const { user } = useContext(AuthContext);

    if (loading) return <CenteredLoader />;
    if (error) return <ErrorMessage message={error} />;

    const tweetsSinRetweet = tweets.map((tweet) => {
        const rest = { ...tweet };

        delete rest.retweeter_id;
        delete rest.retweeter_username;
        delete rest.retweeter_profile_image;

        return rest;
    });

    return (
        <PageWrapper>
            <FeedTabs>
                {user && <NewTweet addTweet={addTweet} />}

                <TweetList
                    tweets={tweetsSinRetweet}
                    removeTweet={removeTweet}
                    toggleLike={toggleLike}
                    toggleRetweet={toggleRetweet}
                />
            </FeedTabs>
        </PageWrapper>
    );
};

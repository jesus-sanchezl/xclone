import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

import { TweetWrapper } from "./TweetWrapper";

export const TweetList = ({
    tweets,
    removeTweet,
    toggleLike,
    toggleRetweet,
    showRetweet = false,
}) => {
    return tweets.length ? (
        <Box component="ul" sx={{ listStyle: "none", margin: 0, padding: 0 }}>
            {tweets.map((tweet) => (
                <Box
                    key={tweet.id}
                    component="li"
                    sx={{
                        margin: 0,
                        padding: 0,
                        width: "100%",
                        borderBottom: "1px solid #e6ecf0",
                    }}
                >
                    <TweetWrapper
                        tweet={tweet}
                        removeTweet={removeTweet}
                        toggleLike={toggleLike}
                        toggleRetweet={toggleRetweet}
                        view="feed"
                        showRetweet={showRetweet}
                    />
                </Box>
            ))}
        </Box>
    ) : (
        <Typography variant="body2" color="text.secondary" textAlign="center">
            No hay tweets que mostrar
        </Typography>
    );
};

TweetList.propTypes = {
    tweets: PropTypes.array.isRequired,
    removeTweet: PropTypes.func,
    toggleLike: PropTypes.func,
    toggleRetweet: PropTypes.func,
    showRetweet: PropTypes.bool,
};

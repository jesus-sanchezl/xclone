import PropTypes from "prop-types";

import { sendTweetService } from "../../services/tweet/tweetServices";

import { TweetFormInline } from "../Tweet/TweetFormInline";

export const NewTweet = ({
    addTweet,
    onClose,
    placeholder = "¿Qué está pasando?",
    buttonText = "Postear",
}) => {
    const handleAddTweetSubmit = async ({ data, token }) => {
        const response = await sendTweetService({ data, token });
        return response;
    };
    return (
        <TweetFormInline
            onSubmit={handleAddTweetSubmit}
            onAdd={addTweet}
            onClose={onClose}
            placeholder={placeholder}
            buttonText={buttonText}
        />
    );
};

NewTweet.propTypes = {
    addTweet: PropTypes.func,
    onClose: PropTypes.func,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
};

import { createContext, useContext } from "react";
import PropTypes from "prop-types";

import { useTweets } from "../hooks/useTweets";

const TweetsContext = createContext();

export const TweetsProvider = ({ children }) => {
    const tweetsData = useTweets();

    return (
        <TweetsContext.Provider value={tweetsData}>
            {children}
        </TweetsContext.Provider>
    );
};

export const useTweetsContext = () => useContext(TweetsContext);

TweetsProvider.propTypes = {
    children: PropTypes.node,
};

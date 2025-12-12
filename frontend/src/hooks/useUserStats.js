import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import { loadTotalTweetsService } from "../services/tweet/tweetServices";

export const useUserStats = (userId) => {
    const [totalTweets, setTotalTweets] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setTotalTweets(0);
            return;
        }

        const loadTotalTweets = async () => {
            try {
                setLoading(true);

                const data = await loadTotalTweetsService({ userId, token });

                setTotalTweets(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadTotalTweets();
    }, [userId, token]);

    return { totalTweets, setTotalTweets, loading, error };
};

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { getUserDataService } from "../services/user/userServices";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    }, [token]);

    useEffect(() => {
        const getUserData = async () => {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }
            try {
                const data = await getUserDataService({ token });

                setUser(data);
            } catch (error) {
                logout();
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);

        getUserData();
    }, [token]);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    const login = (token) => {
        setToken(token);
    };

    const logout = () => {
        setToken("");
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider
            value={{ token, user, loading, login, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProviderComponent.propTypes = {
    children: PropTypes.node,
};

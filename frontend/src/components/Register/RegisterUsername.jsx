import { useState } from "react";
import PropTypes from "prop-types";

import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const RegisterUsername = ({
    username,
    setUsername,
    handleUsernameBlur,
    error,
    setError,
    isValid,
    setIsValid,
}) => {
    const [touchedUsername, setTouchedUsername] = useState(false);

    const Counter = ({ value, max }) => (
        <Box
            sx={{
                position: "absolute",
                top: 6,
                right: 38,
                fontSize: "0.75rem",
                color: value >= max ? "error.main" : "text.disabled",
                pointerEvents: "none",
            }}
        >
            {value}/{max}
        </Box>
    );

    Counter.propTypes = {
        value: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
    };

    return (
        <>
            <Typography variant="h4" fontWeight="bold" textAlign="start" mb={1}>
                ¿Cómo te llamas?
            </Typography>

            <Typography
                variant="body2"
                textAlign="start"
                color="text.secondary"
                mb={2}
            >
                Tu @usuario es único. Puedes cambiarlo cuando quieras.
            </Typography>

            <TextField
                id="username"
                label="Nombre de usuario"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                    setIsValid(false);
                }}
                onBlur={async () => {
                    setTouchedUsername(true);
                    await handleUsernameBlur();
                }}
                error={touchedUsername && !!error}
                helperText={touchedUsername && error ? error : ""}
                inputProps={{ maxLength: 15 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{ mr: 0 }}>
                            <Box
                                component="span"
                                sx={{
                                    color: "text.secondary",
                                    ".MuiOutlinedInput-root.Mui-focused &": {
                                        color: "#1976d2",
                                    },
                                }}
                            >
                                @
                            </Box>
                        </InputAdornment>
                    ),

                    endAdornment: (
                        <>
                            <Counter value={(username || "").length} max={15} />
                            {isValid && (
                                <InputAdornment position="end">
                                    <CheckCircleIcon sx={{ color: "green" }} />
                                </InputAdornment>
                            )}
                        </>
                    ),
                }}
                sx={{ "& .MuiInputBase-root": { position: "relative" } }}
            />
        </>
    );
};

RegisterUsername.propTypes = {
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    handleUsernameBlur: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    setIsValid: PropTypes.func.isRequired,
};

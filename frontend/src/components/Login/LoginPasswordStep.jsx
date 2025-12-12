import PropTypes from "prop-types";

import { Box, Button, IconButton, Stack, TextField } from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginPasswordStep = ({
    email,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,

    handleSnackbarOpen,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "460px",
            }}
        >
            <Stack
                spacing={2.5}
                alignItems="center"
                sx={{ width: "100%", mt: 3 }}
            >
                <TextField
                    variant="standard"
                    type="text"
                    fullWidth
                    disabled
                    multiline
                    value={`Correo electrónico\n${email}`}
                    sx={{
                        width: 350,
                        "& .MuiInputBase-root": {
                            backgroundColor: "#F7F9F9",
                            borderRadius: 2,
                            px: 1.5,
                            py: 1,
                            fontSize: "0.95rem",
                            fontWeight: 400,
                            whiteSpace: "pre-line",
                            lineHeight: "1.4",
                        },
                        "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#D3D8DB",
                            fontFamily: "inherit",
                            fontSize: "0.85rem",
                        },
                    }}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />

                <Box sx={{ width: 350 }}>
                    <TextField
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{ required: false }}
                        autoFocus
                        sx={{
                            mb: 0,
                            "& .MuiInputBase-root": {
                                borderRadius: 2,
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={toggleShowPassword}
                                    edge="end"
                                    sx={{ pr: 0.5 }}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            ),
                        }}
                    />

                    <Box sx={{ textAlign: "left", mt: 0.5 }}>
                        <Button
                            type="button"
                            onClick={handleSnackbarOpen}
                            variant="text"
                            size="small"
                            sx={{
                                p: 0,
                                minWidth: "auto",
                                fontSize: "0.8rem",
                                textTransform: "none",
                                lineHeight: 1.2,
                            }}
                        >
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </Box>
                </Box>
            </Stack>

            <Box sx={{ width: 350, mx: "auto" }}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!password.trim()}
                    sx={{
                        borderRadius: 9999,
                        textTransform: "none",
                        fontWeight: "bold",
                        height: 40,
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": { backgroundColor: "#222" },
                    }}
                    disableRipple
                    disableFocusRipple
                >
                    Iniciar sesión
                </Button>
            </Box>
        </Box>
    );
};

LoginPasswordStep.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    showPassword: PropTypes.bool.isRequired,
    toggleShowPassword: PropTypes.func.isRequired,
    handleSnackbarOpen: PropTypes.func.isRequired,
};

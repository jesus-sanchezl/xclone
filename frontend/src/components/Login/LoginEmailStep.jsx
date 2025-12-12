
import PropTypes from "prop-types";

import { Button, Stack, TextField, Box, Typography, Link } from "@mui/material";

export const LoginEmailStep = ({
    email,
    setEmail,

    closeLoginModal,
    openRegisterModal,
    handleSnackbarOpen,
}) => {
    

    return (
        <>
            <Stack
                spacing={3.4}
                alignItems="center"
                sx={{ width: "100%", mt: 3 }}
            >
                <TextField
                    label="Correo electrónico"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{
                        width: 350,
                        "& .MuiInputBase-root": { borderRadius: 2 },
                    }}
                />

                <Button
                type="submit"
                    variant="contained"
                
                    sx={{
                        width: 350,
                        borderRadius: 8,
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
                    Siguiente
                </Button>

                <Button
                type="button"
                    variant="outlined"
                    onClick={handleSnackbarOpen}
                    sx={{
                        width: 350,
                        borderRadius: 8,
                        textTransform: "none",
                        height: 40,
                        backgroundColor: "white",
                        color: "black",
                        boxShadow: "none",
                        border: "1px solid #ccc",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                    }}
                    disableRipple
                    disableFocusRipple
                >
                    ¿Olvidaste tu contraseña?
                </Button>
            </Stack>

            <Box
                sx={{
                    width: 350,
                    mt: 3,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography variant="body2">
                    ¿No tienes una cuenta?{" "}
                    <Link
                        component="button"
                        type="button"
                        onClick={() => {
                            closeLoginModal();
                            openRegisterModal();
                        }}
                        color="primary"
                    >
                        Regístrate
                    </Link>
                </Typography>
            </Box>
        </>
    );
};

LoginEmailStep.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    closeLoginModal: PropTypes.func.isRequired,
    openRegisterModal: PropTypes.func.isRequired,
    handleSnackbarOpen: PropTypes.func.isRequired,
};

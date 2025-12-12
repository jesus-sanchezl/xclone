import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";



import { Box, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { AuthContext } from "../context/AuthContext";
import {
    checkEmailLoginService,
    loginUserService,
} from "../services/auth/authServices";

import { LoginEmailStep } from "../components/Login/LoginEmailStep";
import { LoginPasswordStep } from "../components/Login/LoginPasswordStep";
import { SocialLoginButtons } from "../components/Login/SocialLoginButtons";

import logoX from "../assets/logoX.png";

export const LoginPage = ({ closeLoginModal, openRegisterModal }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginBanner, setLoginBanner] = useState({
        open: false,
        message: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleNextStep = async () => {
        try {
            if (step === 1) {
                const value = email.trim();

                if (!value) {
                    setLoginBanner({
                        open: true,
                        message: "Por favor, ingresa un correo electrónico.",
                    });
                    return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    setLoginBanner({
                        open: true,
                        message: "Introduce un correo electrónico válido.",
                    });
                    return;
                }

                try {
                    const exists = await checkEmailLoginService(value);
                    if (!exists) {
                        setLoginBanner({
                            open: true,
                            message:
                                "Lo sentimos, no pudimos encontrar tu cuenta.",
                        });
                        return;
                    }
                } catch {
                    setLoginBanner({
                        open: true,
                        message:
                            "No se pudo conectar al servidor. Intenta más tarde.",
                    });
                    return;
                }

                setLoginBanner({ open: false, message: "" });
                setStep(2);
                return;
            } else if (step === 2) {
                const pass = password.trim();

                if (!pass) {
                    setLoginBanner({
                        open: true,
                        message: "Introduce tu contraseña",
                    });
                    return;
                }

                try {
                    const token = await loginUserService({
                        email,
                        password: pass,
                    });
                    login(token);
                    closeLoginModal();
                    navigate("/home");
                } catch (error) {
                    const message  =
                    error.message  === "No se pudo conectar con el servidor. Inténtalo más tarde."
                        ? error.message
                        : "Contraseña incorrecta"

                    setLoginBanner({
                        open: true,
                        message
                    });
                    
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (_event, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            component="section"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                px: 4,
                width: "100%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 460,
                    mx: "auto",
                    mt: 4,
                    py: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: -5,
                        mb: 3,
                    }}
                >
                    <img src={logoX} alt="Logo X" style={{ height: 30 }} />
                </Box>

                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    {step === 1
                        ? "Inicia sesión en X"
                        : "Introduce tu contraseña"}
                </Typography>

                <Box 
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                }}
                
                >
                    {step === 1 && (
                        <>
                            <SocialLoginButtons
                                handleSnackbarOpen={handleSnackbarOpen}
                            />

                            <LoginEmailStep
                                email={email}
                                setEmail={setEmail}
                                closeLoginModal={closeLoginModal}
                                openRegisterModal={openRegisterModal}
                                handleSnackbarOpen={handleSnackbarOpen}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <LoginPasswordStep
                            email={email}
                            password={password}
                            setPassword={setPassword}
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
                            handleSnackbarOpen={handleSnackbarOpen}
                        />
                    )}
                </Box>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <MuiAlert
                    onClose={handleSnackbarClose}
                    severity="info"
                    sx={{ width: "100%" }}
                >
                    Esta funcionalidad estará disponible próximamente.
                </MuiAlert>
            </Snackbar>

            <Snackbar
                open={loginBanner.open}
                autoHideDuration={4000}
                onClose={() => setLoginBanner({ open: false, message: "" })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <MuiAlert
                    onClose={() => setLoginBanner({ open: false, message: "" })}
                    variant="filled"
                    icon={false}
                    elevation={0}
                    sx={{
                        bgcolor: "#1d9bf0",
                        color: "#fff",
                        borderRadius: "12px",
                        px: 2.2,
                        py: 1.1,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        lineHeight: 1.35,
                        width: "fit-content",
                        maxWidth: 560,
                        display: "inline-flex",
                        alignItems: "center",
                        textAlign: "left",
                    }}
                >
                    {loginBanner.message}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

LoginPage.propTypes = {
    closeLoginModal: PropTypes.func.isRequired,
    openRegisterModal: PropTypes.func.isRequired,
};

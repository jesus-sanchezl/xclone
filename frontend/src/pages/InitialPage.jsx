import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
    Box,
    Button,
    Link,
    Snackbar,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { AuthModal } from "../components/Auth/AuthModal";
import { SocialRegisterButtons } from "../components/Register/SocialRegisterButtons";

import logo from "../assets/logoX.png";

export const InitialPage = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsLoginModalOpen(false);
    };
    const closeRegisterModal = () => setIsRegisterModalOpen(false);
    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsRegisterModalOpen(false);
    };
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (_event, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    const handleOpenAbout = () => setOpenAbout(true);
    const handleCloseAbout = () => setOpenAbout(false);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: "grid",
                    gridTemplateAreas: {
                        xs: `"logo" "content"`,
                        md: `"logo content"`,
                    },
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                    alignItems: { xs: "start", md: "center" },
                    columnGap: { md: 0 },

                    px: { xs: 2, sm: 2, md: 0 },
                    pt: { xs: 2, sm: 3, md: 0 },
                }}
            >
                <Box
                    gridArea="logo"
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "center" },
                        alignItems: { xs: "flex-start", md: "center" },

                        px: { xs: 3, sm: 5, md: 0 },
                        pt: { xs: 2, sm: 3, md: 0 },
                    }}
                >
                    <Box
                        component="img"
                        src={logo}
                        alt="Logo X"
                        sx={{
                            height: "auto",

                            width: { xs: 32, sm: 48, md: "60%", lg: "50%" },
                            maxWidth: { md: 360 },
                        }}
                    />
                </Box>

                <Box
                    gridArea="content"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",

                        px: { xs: 3, sm: 5, md: 8 },
                        pt: { xs: 2, sm: 3, md: 0 },
                    }}
                >
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ maxWidth: { xs: 540, md: 640 } }}>
                            <Typography
                                component="h1"
                                sx={{
                                    fontWeight: 800,
                                    lineHeight: 1.05,
                                    textAlign: "left",

                                    fontSize: {
                                        xs: "clamp(28px, 6vw, 36px)",
                                        md: "clamp(56px, 6vw, 72px)",
                                    },
                                    mb: { xs: 3, md: 6 },
                                }}
                            >
                                <Box component="span" sx={{ display: "block" }}>
                                    Lo que está
                                </Box>
                                <Box component="span" sx={{ display: "block" }}>
                                    pasando ahora
                                </Box>
                            </Typography>
                        </Box>

                        <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{ mb: 2, textAlign: "left" }}
                        >
                            Únete hoy
                        </Typography>

                        <Box
                            sx={{
                                width: { xs: 320, sm: 350, md: 350 },

                                textAlign: "left",
                            }}
                        >
                            <SocialRegisterButtons
                                handleSnackbarOpen={handleSnackbarOpen}
                            />

                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    borderRadius: 99,
                                    backgroundColor: "#272C30",
                                    width: "100%",
                                    minHeight: 44,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(39, 44, 48, 0.92)",
                                    },
                                }}
                                disableRipple
                                disableFocusRipple
                                onClick={openRegisterModal}
                            >
                                Crear cuenta
                            </Button>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    lineHeight: 1.5,
                                    fontSize: "0.75rem",
                                    mt: 1,
                                    mb: 5,
                                    textAlign: "left",
                                    maxWidth: 350,
                                }}
                            >
                                Al registrarte, aceptas los{" "}
                                <Link
                                    component={RouterLink}
                                    to="/terms"
                                    underline="none"
                                    sx={{ color: "#1DA1F2" }}
                                >
                                    Términos de servicio
                                </Link>{" "}
                                y la{" "}
                                <Link
                                    component={RouterLink}
                                    to="/privacy"
                                    underline="none"
                                    sx={{ color: "#1DA1F2" }}
                                >
                                    Política de privacidad
                                </Link>
                                , incluida la política de{" "}
                                <Link
                                    component={RouterLink}
                                    to="/cookies"
                                    underline="none"
                                    sx={{ color: "#1DA1F2" }}
                                >
                                    Uso de cookies
                                </Link>
                                .
                            </Typography>

                            <Box mt={4}>
                                <Typography
                                    variant="body1"
                                    mb={2}
                                    sx={{ fontWeight: 600, textAlign: "left" }}
                                >
                                    ¿Ya tienes una cuenta?
                                </Typography>

                                <Button
                                    variant="outlined"
                                    onClick={openLoginModal}
                                    sx={{
                                        borderRadius: 99,
                                        textTransform: "none",
                                        width: "100%",
                                        minHeight: 44,
                                        fontWeight: 600,
                                        color: "black",
                                        borderColor: "#cfd9de",
                                        "&:hover": {
                                            backgroundColor: "#f7f9f9",
                                        },
                                    }}
                                    disableRipple
                                    disableFocusRipple
                                >
                                    Iniciar sesión
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <AuthModal open={isRegisterModalOpen} onClose={closeRegisterModal}>
                <RegisterPage
                    closeRegisterModal={closeRegisterModal}
                    openLoginModal={openLoginModal}
                />
            </AuthModal>

            <AuthModal open={isLoginModalOpen} onClose={closeLoginModal}>
                <LoginPage
                    closeLoginModal={closeLoginModal}
                    openRegisterModal={openRegisterModal}
                />
            </AuthModal>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                sx={{ bottom: { xs: 96, sm: 96, md: 96, lg: 96, xl: 96 } }}
            >
                <MuiAlert
                    onClose={handleSnackbarClose}
                    severity="info"
                    sx={{ width: "100%" }}
                >
                    Esta funcionalidad estará disponible próximamente.
                </MuiAlert>
            </Snackbar>

            <Box
                component="footer"
                sx={{
                    mt: "auto",
                    width: "100%",
                    py: 2,
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                >
                    <Dialog
                        open={openAbout}
                        onClose={handleCloseAbout}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle sx={{ fontWeight: 700 }}>
                            Sobre este proyecto
                        </DialogTitle>

                        <DialogContent
                            dividers
                            sx={{
                                px: 3,
                                py: 2.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "0.9rem",
                                    color: "#0f1419",
                                    lineHeight: 1.6,
                                }}
                            >
                                XClone es una aplicación web tipo X/Twitter
                                desarrollada como proyecto de portfolio
                                fullstack. Permite registro y autenticación de
                                usuarios, publicación de tweets, likes,
                                comentarios y gestión de perfiles.
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 2.5,
                                    fontSize: "0.9rem",
                                    color: "#0f1419",
                                    lineHeight: 1.6,
                                }}
                            >
                                El frontend está construido con{" "}
                                <strong>React (Vite) y Material UI</strong>, y
                                el backend con{" "}
                                <strong>Node.js, Express y MySQL</strong>,
                                mediante una API REST y autenticación JWT.
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 2.5,
                                    fontSize: "0.9rem",
                                    color: "#0f1419",
                                    lineHeight: 1.6,
                                }}
                            >
                                El objetivo del proyecto es demostrar tanto el
                                diseño de una interfaz realista como una
                                arquitectura backend clara y mantenible.
                                Actualmente sirve como base para seguir
                                incorporando nuevas funcionalidades.
                            </Typography>
                        </DialogContent>

                        <DialogActions
                            sx={{ px: 3, py: 2, justifyContent: "flex-end" }}
                        >
                            <Button
                                onClick={handleCloseAbout}
                                variant="text"
                                sx={{
                                    color: "#0f1419",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "rgba(15,20,25,0.08)",
                                    },
                                }}
                            >
                                Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Link
                        component="button"
                        type="button"
                        onClick={handleOpenAbout}
                        underline="none"
                        color="text.secondary"
                        sx={{
                            fontSize: "0.7rem",
                            color: "#536471",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            p: 0,
                        }}
                    >
                        Sobre este proyecto
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        |
                    </Typography>
                    <Link
                        href="https://github.com/jesus-sanchezl/xclone"
                        underline="none"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem", color: "#536471" }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        |
                    </Typography>
                    <Link
                        href="https://jesus-sanchezl.github.io/Porfolio-Jesus-Sanchez/"
                        underline="none"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem", color: "#536471" }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Portfolio
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        |
                    </Typography>
                    <Link
  href="https://www.linkedin.com/in/jesus-sanchezl/"
  underline="none"
  sx={{ fontSize: "0.7rem", color: "#536471" }}
  target="_blank"
  rel="noopener noreferrer"
>
  LinkedIn
</Link>


                    <Typography variant="body2" color="text.secondary">
                        |
                    </Typography>
                    <Link
                        href="mailto:jesus-sanchezl@outlook.es"
                        underline="none"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem", color: "#536471" }}
                    >
                        Contacto
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        |
                    </Typography>
                    
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.7rem", color: "#536471" }}
                    >
                        © {new Date().getFullYear()} Jesús Sánchez
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
};

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Alert,
    Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { AuthContext } from "../context/AuthContext";
import { changePasswordService } from "../services/auth/authServices";

import { PageWrapper } from "../components/Layout/PageWrapper";
import { BackButton } from "../components/Common/BackButton";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;

export const ChangePasswordPage = () => {
    const { token, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        currentPassword: "",
        password: "",
        repeatPassword: "",
    });

    const [show, setShow] = useState({
        current: false,
        new: false,
        repeat: false,
    });

    const [touched, setTouched] = useState({
        currentPassword: false,
        password: false,
        repeatPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setShow((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        currentPassword: "",
        password: "",
        repeatPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const [successOpen, setSuccessOpen] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        const updatedForm = { ...form };
        if (name === "currentPassword") updatedForm.currentPassword = value;
        if (name === "password") updatedForm.password = value;
        if (name === "repeatPassword") updatedForm.repeatPassword = value;
        setForm(updatedForm);

        const updatedErrors = { ...errors };
        if (name === "currentPassword") updatedErrors.currentPassword = "";
        if (name === "password") updatedErrors.password = "";
        if (name === "repeatPassword") updatedErrors.repeatPassword = "";
        setErrors(updatedErrors);
    };

    const validate = () => {
        let errorCurrent = "";
        let errorNew = "";
        let errorRepeat = "";

        if (form.currentPassword === "") {
            errorCurrent = "La contraseña actual es obligatoria.";
        }

        if (form.password === "") {
            errorNew = "La nueva contraseña es obligatoria.";
        } else {
            if (form.password === form.currentPassword) {
                errorNew =
                    "La nueva contraseña no puede ser igual a la anterior.";
            } else if (!PASSWORD_REGEX.test(form.password)) {
                errorNew =
                    "Debe tener entre 8 y 20 caracteres, con al menos una letra y un número.";
            }
        }

        if (form.repeatPassword === "") {
            errorRepeat = "Repite la nueva contraseña.";
        } else {
            if (form.repeatPassword !== form.password) {
                errorRepeat = "Las contraseñas no coinciden.";
            }
        }

        setErrors({
            currentPassword: errorCurrent,
            password: errorNew,
            repeatPassword: errorRepeat,
        });

        return errorCurrent === "" && errorNew === "" && errorRepeat === "";
    };

    const handleBlur = (e) => {
        const name = e.target.name;

        const updatedTouched = { ...touched };

        if (name === "currentPassword") {
            updatedTouched.currentPassword = true;
        }
        if (name === "password") {
            updatedTouched.password = true;
        }
        if (name === "repeatPassword") {
            updatedTouched.repeatPassword = true;
        }

        setTouched(updatedTouched);

        validate();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        setTouched({
            currentPassword: true,
            password: true,
            repeatPassword: true,
        });
        if (!validate()) return;

        setLoading(true);

        try {
            await changePasswordService({
                token,
                currentPassword: form.currentPassword,
                password: form.password,
            });

            setForm({ currentPassword: "", password: "", repeatPassword: "" });

            setSuccessOpen(true);
        } catch (err) {
            const msg =
                err?.message === "Failed to fetch"
                    ? "No se pudo conectar al servidor. Intenta más tarde."
                    : err?.message || "No se pudo actualizar la contraseña.";
            setErrorMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSuccessOpen(false);
        logout();
        navigate("/", { replace: true });
    };

    const adornment = (field) => ({
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    onClick={() => togglePasswordVisibility(field)}
                    edge="end"
                    disabled={loading}
                    aria-label={
                        show[field]
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                    }
                >
                    {show[field] ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        ),
    });

    const canSubmit = () => {
        const hasCurrent = form.currentPassword !== "";

        const meetsFormat = PASSWORD_REGEX.test(form.password);

        const match = form.password === form.repeatPassword;

        const isDifferent = form.password !== form.currentPassword;

        const notLoading = !loading;

        return hasCurrent && meetsFormat && match && isDifferent && notLoading;
    };

    return (
        <PageWrapper>
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    bgcolor: "white",
                    borderBottom: "1px solid #e6ecf0",
                    px: 1.5,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <BackButton onClick={() => navigate(-1)} />

                <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
                    Cambia tu contraseña
                </Typography>
            </Box>

            <Box sx={{ maxWidth: 800, mx: "auto" }}>
                <Box
                    component="form"
                    id="change-password-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errorMessage && (
                        <Alert
                            severity="error"
                            onClose={() => setErrorMessage(null)}
                            sx={{
                                mb: 2,
                                width: "100%",
                                bgcolor: "#FFF5F5",
                                color: "#742A2A",
                                border: "1px solid #FED7D7",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                fontWeight: 500,
                            }}
                        >
                            {errorMessage}
                        </Alert>
                    )}

                    <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 2 }}>
                        <TextField
                            name="currentPassword"
                            type={show.current ? "text" : "password"}
                            label="Contraseña actual"
                            value={form.currentPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={loading}
                            fullWidth
                            margin="normal"
                            error={
                                touched.currentPassword &&
                                !!errors.currentPassword
                            }
                            helperText={
                                touched.currentPassword
                                    ? errors.currentPassword
                                    : ""
                            }
                            InputProps={adornment("current")}
                        />
                    </Box>

                    <Box
                        sx={{
                            borderBottom: "1px solid #e6ecf0",
                            width: "100%",
                        }}
                    />

                    <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 2 }}>
                        <TextField
                            name="password"
                            type={show.new ? "text" : "password"}
                            label="Nueva contraseña"
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={loading}
                            fullWidth
                            margin="normal"
                            error={touched.password && !!errors.password}
                            helperText={touched.password ? errors.password : ""}
                            InputProps={adornment("new")}
                        />

                        <TextField
                            name="repeatPassword"
                            type={show.repeat ? "text" : "password"}
                            label="Repite la nueva contraseña"
                            value={form.repeatPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={loading}
                            fullWidth
                            margin="normal"
                            error={
                                touched.repeatPassword &&
                                !!errors.repeatPassword
                            }
                            helperText={
                                touched.repeatPassword
                                    ? errors.repeatPassword
                                    : ""
                            }
                            InputProps={adornment("repeat")}
                        />
                    </Box>

                    <Box
                        sx={{
                            borderBottom: "1px solid #e6ecf0",
                            width: "100%",
                        }}
                    />

                    <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                my: 2,
                                color: "text.secondary",
                                fontSize: 16,
                                lineHeight: 1.4,
                            }}
                        >
                            Al cambiar tu contraseña, cerraremos todas tus
                            sesiones, también esta. Deberás iniciar sesión de
                            nuevo para continuar usando tu cuenta.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            borderBottom: "1px solid #e6ecf0",
                            width: "100%",
                        }}
                    />

                    <Box
                        sx={{
                            maxWidth: 600,
                            mx: "auto",
                            px: 2,
                            py: 2,
                            mt: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!canSubmit()}
                            sx={{
                                borderRadius: "999px",
                                px: 3.5,
                                py: 0.8,
                                backgroundColor: "#0F1419",
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: 15,
                                color: "white",
                                "&:hover": { backgroundColor: "#272C30" },
                                "&.Mui-disabled": {
                                    backgroundColor: "#AAB8C2",
                                    color: "white",
                                },
                            }}
                        >
                            {loading ? "Guardando..." : "Guardar"}
                        </Button>

                        <Snackbar
                            open={successOpen}
                            autoHideDuration={800}
                            onClose={handleSuccessClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                        >
                            <Alert
                                severity="success"
                                variant="filled"
                                sx={{
                                    width: "100%",
                                    bgcolor: "#F0FFF4",
                                    color: "#22543D",
                                    border: "1px solid #C6F6D5",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                    fontWeight: 500,
                                }}
                            >
                                Contraseña actualizada correctamente
                            </Alert>
                        </Snackbar>
                    </Box>
                </Box>
            </Box>
        </PageWrapper>
    );
};

export default ChangePasswordPage;

import { useState } from "react";
import {
    Box,
    Stack,
    TextField,
    Button,
    Typography,
    Alert,
} from "@mui/material";
import { forgotPasswordService } from "../../services/auth/authServices";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError("El correo electrónico es obligatorio.");
            return;
        }

        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!EMAIL_REGEX.test(trimmedEmail)) {
            setError("Introduce un correo electrónico válido.");
            return;
        }

        setLoading(true);

        try {
            const response = await forgotPasswordService(trimmedEmail);
            setMessage(response.message);
        } catch (error) {
            setError(
                error.message ||
                    "Error al solicitar recuperación de contraseña."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="section"
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 350,
                    mt: 3,
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    textAlign="center"
                >
                    Recuperar contraseña
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleForgotPassword}
                    noValidate
                >
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
                            required
                            margin="normal"
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-root": { borderRadius: 2 },
                            }}
                        />

                        {message ? (
                            <Alert severity="success" sx={{ width: "100%" }}>
                                {message}
                            </Alert>
                        ) : null}

                        {error ? (
                            <Alert severity="error" sx={{ width: "100%" }}>
                                {error}
                            </Alert>
                        ) : null}

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                width: "100%",
                                borderRadius: 8,
                                textTransform: "none",
                                fontWeight: "bold",
                                height: 40,
                                backgroundColor: "black",
                                color: "white",
                                "&:hover": { backgroundColor: "#222" },
                            }}
                        >
                            {loading
                                ? "Enviando..."
                                : "Enviar enlace de recuperación"}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

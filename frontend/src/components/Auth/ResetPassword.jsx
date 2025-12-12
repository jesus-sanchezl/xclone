import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Box,
    Stack,
    TextField,
    Button,
    Typography,
    Alert,
} from "@mui/material";
import { resetPasswordService } from "../../services/auth/authServices";

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            setError("Enlace inválido o caducado.");
        }
    }, [token]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!token) {
            setError("Enlace inválido o caducado.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        try {
            const response = await resetPasswordService({ token, password });

            setMessage(response.message);

            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            setError(error.message || "Error al restablecer la contraseña");
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
            <Box sx={{ width: 350, mt: 3 }}>
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    textAlign="center"
                >
                    Restablecer contraseña
                </Typography>

                <Box component="form" onSubmit={handleResetPassword} noValidate>
                    <Stack
                        spacing={3.4}
                        alignItems="center"
                        sx={{ width: "100%", mt: 3 }}
                    >
                        <TextField
                            label="Nueva Contraseña"
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-root": { borderRadius: 2 },
                            }}
                        />

                        <TextField
                            label="Confirmar Contraseña"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
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
                            disabled={loading || !token}
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
                                ? "Restableciendo..."
                                : "Restablecer contraseña"}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

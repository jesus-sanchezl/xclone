import PropTypes from "prop-types";
import { IconButton, Link, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const RegisterPassword = ({
    password,
    repeatPassword,
    showPassword,
    showRepeatPassword,
    setPassword,
    setRepeatPassword,
    setShowPassword,
    setShowRepeatPassword,
    passwordError,
    setPasswordError,
    repeatPasswordError,
    setRepeatPasswordError,
    validatePasswordFormat,
}) => {
    return (
        <>
            <Typography variant="h4" fontWeight="bold" textAlign="start">
                Necesitarás una contraseña
            </Typography>

            <Typography variant="body2" textAlign="start" mb={2}>
                Asegúrate de que tenga 8 caracteres o más
            </Typography>

            <TextField
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                }}
                onBlur={() => {
                    if (!validatePasswordFormat(password)) {
                        setPasswordError(
                            "La contraseña debe tener entre 8 y 20 caracteres y contener al menos una letra y un número"
                        );
                    } else {
                        setPasswordError("");
                    }
                }}
                error={!!passwordError}
                helperText={passwordError}
                inputProps={{ maxLength: 20 }}
                InputLabelProps={{ required: false }}
                sx={{
                    mb: 0,
                    "& .MuiInputBase-root": {
                        borderRadius: 2,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                            sx={{ pr: 0.5 }}
                            aria-label={
                                showPassword
                                    ? "Ocultar contraseña"
                                    : "Mostrar contraseña"
                            }
                            aria-pressed={showPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    ),
                }}
            />

            <TextField
                label="Confirmar contraseña"
                type={showRepeatPassword ? "text" : "password"}
                id="repeatPassword"
                name="repeatPassword"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={repeatPassword}
                onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    setRepeatPasswordError("");
                }}
                onBlur={() => {
                    if (password !== repeatPassword) {
                        setRepeatPasswordError("Las contraseñas no coinciden");
                    } else {
                        setRepeatPasswordError("");
                    }
                }}
                error={!!repeatPasswordError}
                inputProps={{ maxLength: 20 }}
                helperText={repeatPasswordError}
                InputLabelProps={{ required: false }}
                sx={{
                    mt: 2,
                    mb: 7,
                    "& .MuiInputBase-root": {
                        borderRadius: 2,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={() =>
                                setShowRepeatPassword((prev) => !prev)
                            }
                            edge="end"
                            sx={{ pr: 0.5 }}
                            aria-label={
                                showRepeatPassword
                                    ? "Ocultar confirmación de contraseña"
                                    : "Mostrar confirmación de contraseña"
                            }
                            aria-pressed={showRepeatPassword}
                        >
                            {showRepeatPassword ? (
                                <VisibilityOff />
                            ) : (
                                <Visibility />
                            )}
                        </IconButton>
                    ),
                }}
            />

            <Typography
                variant="caption"
                sx={{
                    fontSize: "12px",
                    color: "text.secondary",
                    textAlign: "center",
                }}
            >
                Al registrarte, aceptas nuestros{" "}
                <Link
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#1DA1F2" }}
                >
                    Términos
                </Link>
                , nuestra{" "}
                <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#1DA1F2" }}
                >
                    Política de privacidad
                </Link>{" "}
                y el{" "}
                <Link
                    href="/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#1DA1F2" }}
                >
                    Uso de cookies
                </Link>
                . X podrá usar tu información de contacto, como tu dirección de
                correo electrónico y/o número de teléfono, con los fines
                descritos en nuestra Política de privacidad.{" "}
                <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ color: "#1DA1F2" }}
                >
                    Más información
                </Link>
            </Typography>
        </>
    );
};

RegisterPassword.propTypes = {
    password: PropTypes.string.isRequired,
    repeatPassword: PropTypes.string.isRequired,
    showPassword: PropTypes.bool.isRequired,
    showRepeatPassword: PropTypes.bool.isRequired,
    setPassword: PropTypes.func.isRequired,
    setRepeatPassword: PropTypes.func.isRequired,
    setShowPassword: PropTypes.func.isRequired,
    setShowRepeatPassword: PropTypes.func.isRequired,
    passwordError: PropTypes.string,
    validatePasswordFormat: PropTypes.func.isRequired,
    repeatPasswordError: PropTypes.string,
    setPasswordError: PropTypes.func.isRequired,
    setRepeatPasswordError: PropTypes.func.isRequired,
};

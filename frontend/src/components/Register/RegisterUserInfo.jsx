import { useState } from "react";
import PropTypes from "prop-types";

import { Box, Stack, TextField, Typography } from "@mui/material";


export const RegisterUserInfo = ({
    name,
    setName,
    email,
    setEmail,
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    nameError,
    setNameError,
    emailError,
    setEmailError,
    birthdateError,
    setBirthdateError,
}) => {
    const [touchedName, setTouchedName] = useState(false);
    const [touchedEmail, setTouchedEmail] = useState(false);

    const Counter = ({ value, max }) => (
        <Box
            sx={{
                position: "absolute",
                top: 6,
                right: 12,
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

    const isValidEmailFormat = (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    


    return (
        <>
            <Typography variant="h4" fontWeight="bold" textAlign="start" mb={2}>
                Crea tu cuenta
            </Typography>

            <TextField
                label="Nombre"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    if (touchedName && nameError) setNameError("");
                }}
                onBlur={() => {
                    setTouchedName(true);
                    const value = name.trim();
                    if (value.length === 0) setNameError("¿Cómo te llamas?");
                    else if (value.length < 3)
                        setNameError("Debe tener al menos 3 caracteres");
                    else if (value.length >= 50)
                        setNameError("Debe tener como máximo 50 caracteres");
                    else setNameError("");
                }}
                error={touchedName && !!nameError}
                helperText={touchedName && nameError ? nameError : ""}
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 50 }}
                InputProps={{
                    endAdornment: (
                        <Counter value={(name || "").length} max={50} />
                    ),
                }}
                sx={{ "& .MuiInputBase-root": { position: "relative" } }}
            />

            <TextField
                label="Correo electrónico"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (touchedEmail && emailError) setEmailError("");
                }}
                 onBlur={() => {
        setTouchedEmail(true);
        const value = email.trim();

        if (!value) {
            setEmailError("Introduce tu correo electrónico");
        } else if (!isValidEmailFormat(value)) {
            setEmailError("Introduce un correo electrónico válido");
        } else {
            setEmailError("");
        }
    }}
                error={touchedEmail && !!emailError}
                helperText={touchedEmail && emailError ? emailError : ""}
                fullWidth
                margin="normal"
            />

            <Box mt={2} sx={{ width: "100%", textAlign: "left" }}>
                <Typography variant="subtitle2" fontWeight="bold">
                    Fecha de nacimiento
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="0.75rem"
                    mb={1}
                >
                    Esta información no será pública. Confirma tu propia edad,
                    incluso si esta cuenta es para una empresa, una mascota u
                    otra cosa.
                </Typography>

                <Stack direction="row" spacing={1} mt={2}>
                    <Box sx={{ width: "50%" }}>
                        <TextField
                            select
                            label="Mes"
                            value={month}
                            onChange={(e) => {
                                setMonth(e.target.value);
                                setBirthdateError("");
                            }}
                            fullWidth
                            SelectProps={{ native: true }}
                        >
                            <option value=""></option>
                            <option value="enero">Enero</option>
                            <option value="febrero">Febrero</option>
                            <option value="marzo">Marzo</option>
                            <option value="abril">Abril</option>
                            <option value="mayo">Mayo</option>
                            <option value="junio">Junio</option>
                            <option value="julio">Julio</option>
                            <option value="agosto">Agosto</option>
                            <option value="septiembre">Septiembre</option>
                            <option value="octubre">Octubre</option>
                            <option value="noviembre">Noviembre</option>
                            <option value="diciembre">Diciembre</option>
                        </TextField>
                    </Box>

                    <Box sx={{ width: "20%" }}>
                        <TextField
                            select
                            label="Día"
                            value={day}
                            onChange={(e) => {
                                setDay(e.target.value);
                                setBirthdateError("");
                            }}
                            fullWidth
                            SelectProps={{ native: true }}
                        >
                            <option value=""></option>
                            {[...Array(31)].map((_, index) => (
                                <option key={index} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </TextField>
                    </Box>

                    <Box sx={{ width: "30%" }}>
                        <TextField
                            select
                            label="Año"
                            value={year}
                            onChange={(e) => {
                                setYear(e.target.value);
                                setBirthdateError("");
                            }}
                            fullWidth
                            SelectProps={{ native: true }}
                        >
                            <option value=""></option>
                            {[...Array(100)].map((_, index) => {
                                const year = new Date().getFullYear() - index;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </TextField>
                    </Box>
                </Stack>
                {birthdateError && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ mt: 1, ml: 1 }}
                    >
                        {birthdateError}
                    </Typography>
                )}
            </Box>
        </>
    );
};

RegisterUserInfo.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    day: PropTypes.string.isRequired,
    setDay: PropTypes.func.isRequired,
    month: PropTypes.string.isRequired,
    setMonth: PropTypes.func.isRequired,
    year: PropTypes.string.isRequired,
    setYear: PropTypes.func.isRequired,
    nameError: PropTypes.string.isRequired,
    setNameError: PropTypes.func.isRequired,
    emailError: PropTypes.string.isRequired,
    setEmailError: PropTypes.func.isRequired,
    birthdateError: PropTypes.string.isRequired,
    setBirthdateError: PropTypes.func.isRequired,
};

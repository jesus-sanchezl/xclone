import PropTypes from "prop-types";

import { Box, Button, Alert } from "@mui/material";

import { useRegisterForm } from "../hooks/useRegisterForm";

import { RegisterUserInfo } from "../components/Register/RegisterUserInfo";
import { RegisterPassword } from "../components/Register/RegisterPassword";
import { RegisterProfileImage } from "../components/Register/RegisterProfileImage";
import { RegisterUsername } from "../components/Register/RegisterUsername";
import { RegisterConfirmation } from "../components/Register/RegisterConfirmation";

import defaultProfileImage from "../assets/default_profile.jpeg";
import logoX from "../assets/logoX.png";

export const RegisterPage = ({ closeRegisterModal, openLoginModal }) => {
    const {
        step,
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
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        image,
        setImage,
        username,
        setUsername,
        error,
        setError,
        isValid,
        setIsValid,
        nameError,
        setNameError,
        emailError,
        setEmailError,
        birthdateError,
        setBirthdateError,
        passwordError,
        repeatPasswordError,
        setPasswordError,
        setRepeatPasswordError,
        showPassword,
        setShowPassword,
        showRepeatPassword,
        setShowRepeatPassword,
        handleUsernameBlur,
        handleNextStep,
        handleForm,
        validatePasswordFormat,
    } = useRegisterForm({ closeRegisterModal, openLoginModal });

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
                    minHeight: 460,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    mx: "auto",
                    pt: 4,
                    pb: 0,
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

                <Box
                    component="form"
                    onSubmit={handleForm}
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                        {step === 1 && (
                            <RegisterUserInfo
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                day={day}
                                setDay={setDay}
                                month={month}
                                setMonth={setMonth}
                                year={year}
                                setYear={setYear}
                                nameError={nameError}
                                setNameError={setNameError}
                                emailError={emailError}
                                setEmailError={setEmailError}
                                birthdateError={birthdateError}
                                setBirthdateError={setBirthdateError}
                            />
                        )}

                        {step === 2 && (
                            <RegisterPassword
                                password={password}
                                repeatPassword={repeatPassword}
                                showPassword={showPassword}
                                showRepeatPassword={showRepeatPassword}
                                setPassword={setPassword}
                                setRepeatPassword={setRepeatPassword}
                                setShowPassword={setShowPassword}
                                setShowRepeatPassword={setShowRepeatPassword}
                                setError={setError}
                                passwordError={passwordError}
                                repeatPasswordError={repeatPasswordError}
                                setPasswordError={setPasswordError}
                                setRepeatPasswordError={setRepeatPasswordError}
                                validatePasswordFormat={validatePasswordFormat}
                            />
                        )}

                        {step === 3 && (
                            <RegisterProfileImage
                                image={image}
                                setImage={setImage}
                                onContinue={handleNextStep}
                                defaultProfileImage={defaultProfileImage}
                            />
                        )}

                        {step === 4 && (
                            <RegisterUsername
                                username={username}
                                setUsername={setUsername}
                                handleUsernameBlur={handleUsernameBlur}
                                error={error}
                                setError={setError}
                                isValid={isValid}
                                setIsValid={setIsValid}
                            />
                        )}
                    </Box>

                    {error && step !== 4 && (
                        <Box sx={{ mt: 2 }}>
                            <Alert severity="error" sx={{ fontSize: 14 }}>
                                {error}
                            </Alert>
                        </Box>
                    )}

                    {step < 5 && step !== 3 && (
                        <Box sx={{ width: "100%", mt: 0, mb: -8 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleNextStep}
                                disabled={
                                    (step === 1 &&
                                        (!name ||
                                            !email ||
                                            !day ||
                                            !month ||
                                            !year)) ||
                                    (step === 2 &&
                                        (!password || !repeatPassword)) ||
                                    (step === 4 && !username)
                                }
                                sx={{
                                    borderRadius: 9999,
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    height: 40,
                                    backgroundColor:
                                        name && email && day && month && year
                                            ? "black"
                                            : "#cfd9de",
                                    color:
                                        name && email && day && month && year
                                            ? "white"
                                            : "#87898C",
                                    "&:hover": {
                                        backgroundColor:
                                            name &&
                                            email &&
                                            day &&
                                            month &&
                                            year
                                                ? "#222"
                                                : "#cfd9de",
                                    },
                                    "&.Mui-disabled": {
                                        color: "#ffffff",
                                        backgroundColor: "#87898C",
                                    },
                                }}
                                disableRipple
                                disableFocusRipple
                            >
                                Siguiente
                            </Button>
                        </Box>
                    )}

                    {step === 5 && (
                        <>
                            <RegisterConfirmation />

                            <Box sx={{ width: 460, mx: "auto", mt: 2 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        borderRadius: 9999,
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        height: 40,
                                        backgroundColor: "black",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#222",
                                        },
                                    }}
                                >
                                    Confirmar
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

RegisterPage.propTypes = {
    closeRegisterModal: PropTypes.func.isRequired,
    openLoginModal: PropTypes.func.isRequired,
};

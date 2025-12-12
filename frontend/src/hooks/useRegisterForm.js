import { useState } from "react";

import { formatAndValidateDate } from "../utils/formatAndValidateDate";

import {
    checkEmailService,
    checkUsernameService,
    registerUserService,
} from "../services/auth/authServices";


export const useRegisterForm = ({ closeRegisterModal, openLoginModal }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [error, setError] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [birthdateError, setBirthdateError] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const validateUsernameFormat = (value) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{3,14}$/;
        return regex.test(value);
    };

    const validatePasswordFormat = (value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
        return regex.test(value);
    };

const handleUsernameBlur = () => {
    const value = username.trim();

    
    setIsValid(false);

    if (!value) {
        setError("El nombre de usuario es obligatorio.");
        return;
    }


    if (!validateUsernameFormat(value)) {
        setError(
            "El nombre de usuario debe tener entre 4 y 15 caracteres, comenzar por una letra y solo puede contener letras, números o guion bajo (_)."
        );
        return;
    }


    setError("");
    setIsValid(true);
};


    const handleNextStep = async () => {
        setError("");

        if (step === 1) {
            let hasError = false;
            setNameError("");
            setEmailError("");
            setBirthdateError("");

            const value = name.trim();
            if (value.length === 0) {
                setNameError("¿Cómo te llamas?");
                hasError = true;
            } else if (value.length < 3) {
                setNameError("Debe tener al menos 3 caracteres");
                hasError = true;
            } else if (value.length >= 50) {
                setNameError("Debe tener como máximo 50 caracteres");
                hasError = true;
            }

            const emailTrim = email.trim();

            if (!emailTrim) {
                setEmailError("Introduce tu correo electrónico");
                hasError = true;
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailTrim)) {
                setEmailError("Introduce un correo electrónico válido");
                hasError = true;
                return;
            }

            try {
                await checkEmailService(emailTrim);
                setEmailError("");
            } catch (err) {
             if (err.message.includes("No se pudo conectar")) {
        
        setError("No se pudo conectar con el servidor. Intenta más tarde.");
    } else {
        
        setEmailError("No se ha podido validar este correo electrónico.");
    }
                hasError = true;
            }

            const { valid, error: dateError } = formatAndValidateDate(
                day,
                month,
                year
            );
            if (!valid) {
                setBirthdateError(dateError);
                hasError = true;
            }
            if (hasError) return;
        }

        if (step === 2) {
    let hasError = false;
    setPasswordError("");
    setRepeatPasswordError("");
    setError("");

    if (!validatePasswordFormat(password)) {
        setPasswordError(
            "La contraseña debe tener entre 8 y 20 caracteres y contener al menos una letra y un número"
        );
        hasError = true;
    }

    if (password !== repeatPassword) {
        setRepeatPasswordError("Las contraseñas no coinciden");
        hasError = true;
    }

    if (hasError) return;
}

        if (step === 4) {
            const usernameTrim = username.trim();
            if (!usernameTrim) {
                setError("Por favor, elige un nombre de usuario");
                return;
            }

            if (!validateUsernameFormat(usernameTrim)) {
                setError(
                    "El nombre de usuario debe tener entre 4 y 15 caracteres, comenzar por una letra y solo puede contener letras, números o guion bajo (_)."
                );
                return;
            }

            try {
                await checkUsernameService(usernameTrim);
            } catch  {
                setError("Este nombre de usuario no está disponible.");
                return;
            }
        }

        setStep(step + 1);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const {
                valid,
                error: dateError,
                birthdate,
            } = formatAndValidateDate(day, month, year);

            if (!valid) {
                setError(dateError);
                return;
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("birthdate", birthdate);
            formData.append("password", password);
            formData.append("repeatPassword", repeatPassword);
            formData.append("username", username);

            if (image) {
                formData.append("profile_image", image);
            }

            await registerUserService(formData);

            closeRegisterModal();
            openLoginModal();
        } catch {
            setError(
                "No se ha podido completar el registro. Inténtalo de nuevo más tarde"
            );
            
        }
    };

    return {
        step,
        setStep,
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
        showPassword,
        setShowPassword,
        showRepeatPassword,
        setShowRepeatPassword,

        isValid,
        setIsValid,
        nameError,
        setNameError,
        emailError,
        setEmailError,
        birthdateError,
        setBirthdateError,
        passwordError,
        setPasswordError,
        repeatPasswordError,
        setRepeatPasswordError,

        handleUsernameBlur,
        handleNextStep,
        handleForm,
        validatePasswordFormat,
    };
};

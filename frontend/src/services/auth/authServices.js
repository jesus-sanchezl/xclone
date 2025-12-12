import { httpClient } from "../httpClient";

export const registerUserService = async (formData) => {
    await httpClient("/users/register", {
        method: "POST",
        body: formData,
        isFormData: true,
        defaultErrorMessage: "Error al registrar el usuario.",
    });
};

export const checkEmailService = async (email) => {
    const json = await httpClient("/users/check-email", {
        method: "POST",
        body: { email },
        defaultErrorMessage: "Error al verificar el email.",
    });

    return json;
};



/**
 Este servicio no usa httpClient porque su comportamiento especial es devolver false en vez de lanzar un error.

 Ningún otro servicio tiene esa lógica.

*/

export const checkEmailLoginService = async (email) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/users/check-email-login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        }
    );

    const json = await response.json();

    if (!response.ok) {
        return false;
    }

    return json;
};

export const checkUsernameService = async (username) => {
    const json = await httpClient("/users/check-username", {
        method: "POST",
        body: { username },
        defaultErrorMessage: "Error al verificar el nombre de usuario.",
    });

    return json;
};

export const loginUserService = async ({ email, password }) => {
    const json = await httpClient("/users/login", {
        method: "POST",
        body: { email, password },
        defaultErrorMessage: "No se pudo iniciar sesión.",
    });

    return json.data.token;
};

export const forgotPasswordService = async (email) => {
    const json = await httpClient("/users/forgot-password", {
        method: "POST",
        body: { email },
        defaultErrorMessage:
            "No se pudo procesar la recuperación de contraseña.",
    });

    return json;
};

export const resetPasswordService = async ({ token, password }) => {
    const json = await httpClient("/users/reset-password", {
        method: "POST",
        body: { token, password },
        defaultErrorMessage: "No se pudo restablecer la contraseña.",
    });

    return json;
};

export const changePasswordService = async ({
    token,
    currentPassword,
    password,
}) => {
    const json = await httpClient("/users/update-password", {
        method: "PUT",
        token,
        body: { currentPassword, password },
        defaultErrorMessage: "No se pudo actualizar la contraseña.",
    });

    return json.data;
};

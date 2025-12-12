import { httpClient } from "../httpClient";

export const getUserDataService = async ({ token }) => {
    const json = await httpClient("/users/userinfo", {
        token,
        defaultErrorMessage: "No se pudo cargar la información del usuario.",
    });

    return json.data;
};

export const loadUserInfoService = async ({ id, token }) => {
    const json = await httpClient(`/users/${id}`, {
        token,
        defaultErrorMessage:
            "No se pudo cargar la información de este usuario.",
    });

    return json.data;
};

export const getMyUserDataService = async (token) => {
    const json = await httpClient("/users/userinfo", {
        token,
        defaultErrorMessage: "No se pudieron cargar tus datos.",
    });

    return json.data;
};

export const updateUserDataService = async ({ token, formData }) => {
    const json = await httpClient("/users/me", {
        method: "PUT",
        token,
        body: formData,
        isFormData: true,
        defaultErrorMessage: "No se pudieron actualizar tus datos.",
    });

    return json.data;
};

export const updateUserCoverImageService = async ({ token, formData }) => {
    const json = await httpClient("/users/cover-image", {
        method: "PUT",
        token,
        body: formData,
        isFormData: true,
        defaultErrorMessage: "No se pudo actualizar la imagen de portada.",
    });

    return json.data;
};

export const updateUserProfileImageService = async ({ token, formData }) => {
    const json = await httpClient("/users/update-photo", {
        method: "PUT",
        token,
        body: formData,
        isFormData: true,
        defaultErrorMessage: "No se pudo actualizar la foto de perfil.",
    });

    return json.data;
};

const BASE_URL = import.meta.env.VITE_BACKEND;

export const httpClient = async (
    path,
    {
        method = "GET",
        token,
        body,
        isFormData = false,
        defaultErrorMessage = "Ha ocurrido un error inesperado.",
    } = {}
) => {
    const headers = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const hasBody = body !== undefined && body !== null;
    if (hasBody && !isFormData) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            method,
            headers,
            body: hasBody
                ? isFormData
                    ? body
                    : JSON.stringify(body)
                : undefined,
        });

        let json = {};
        try {
            json = await response.json();
        } catch {
            // si el backend no manda JSON, json se queda como {}
        }

        if (!response.ok) {
            const message = json.message || defaultErrorMessage;
            throw new Error(message);
        }

        return json;
    } catch (err) {
        if (err.message === "Failed to fetch") {
            throw new Error(
                "No se pudo conectar con el servidor. Inténtalo más tarde."
            );
        }

        throw new Error(err.message || defaultErrorMessage);
    }
};

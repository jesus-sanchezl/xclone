import { useEffect } from "react";

import { Container, Box, Typography, Divider } from "@mui/material";

export const CookiesPage = () => {
    useEffect(() => {
        document.title = "Uso de cookies";
    }, []);

    return (
        <main>
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: 680,
                    px: { xs: 2, sm: 3 },
                    py: { xs: 4, sm: 6 },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1.75rem", sm: "2rem" },
                        letterSpacing: "-0.015em",
                        mb: 1.5,
                    }}
                >
                    Política de cookies
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Última actualización: septiembre 2025
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        lineHeight: 1.7,
                        mb: 2,
                    }}
                >
                    Este proyecto utiliza cookies de manera limitada, únicamente
                    para:
                </Typography>

                <Box
                    component="ul"
                    sx={{
                        pl: 3,
                        my: 0,
                        "& li": {
                            mb: 1,
                            fontSize: { xs: "0.95rem", sm: "1rem" },
                            lineHeight: 1.7,
                            color: "text.primary",
                        },
                    }}
                >
                    <li>Mantener tu sesión iniciada mientras navegas.</li>
                    <li>
                        Recordar algunas preferencias básicas de la aplicación.
                    </li>
                </Box>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        lineHeight: 1.7,
                        mt: 2,
                    }}
                >
                    No se utilizan cookies con fines publicitarios ni para
                    rastrear tu actividad fuera de la aplicación. Al continuar
                    usando la aplicación, entiendes y aceptas este uso básico de
                    cookies.
                </Typography>
            </Container>
        </main>
    );
};

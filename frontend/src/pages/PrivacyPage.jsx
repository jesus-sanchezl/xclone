import { useEffect } from "react";

import { Container, Box, Typography, Divider } from "@mui/material";

export const PrivacyPage = () => {
    useEffect(() => {
        document.title = "Política de privacidad";
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
                    Política de privacidad
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
                    Este proyecto no recopila ni almacena datos personales
                    sensibles. La información introducida en formularios de
                    registro o login es ficticia y de prueba, únicamente con
                    fines de demostración técnica.
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
                    <li>No se comparten datos con terceros.</li>
                    <li>
                        No se utilizan cookies de seguimiento con fines
                        publicitarios.
                    </li>
                    <li>
                        Los datos pueden eliminarse reiniciando la base de datos
                        del proyecto.
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
                    En resumen: tu privacidad está protegida porque la
                    aplicación es solo un portfolio educativo.
                </Typography>
            </Container>
        </main>
    );
};

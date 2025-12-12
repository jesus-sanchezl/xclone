import { useEffect } from "react";

import { Container, Box, Typography, Divider } from "@mui/material";

export const TermsPage = () => {
    useEffect(() => {
        document.title = "Términos de servicio";
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
                    Términos de servicio
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
                        color: "text.primary",
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        lineHeight: 1.7,
                        mb: 2,
                    }}
                >
                    Bienvenido a este proyecto personal que replica la
                    experiencia de Twitter/X. El objetivo de esta aplicación es
                    mostrar mis habilidades como desarrollador web y no tiene
                    carácter comercial ni está asociada a ninguna empresa.
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        lineHeight: 1.7,
                        mb: 1,
                    }}
                >
                    Al usar esta aplicación aceptas que:
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
                    <li>
                        Todo el contenido y las cuentas son de prueba o
                        ficticias.
                    </li>
                    <li>
                        No se recopila ni utiliza tu información personal con
                        fines comerciales.
                    </li>
                    <li>
                        El acceso y uso pueden cambiar en cualquier momento, ya
                        que el proyecto está en constante desarrollo.
                    </li>
                </Box>
            </Container>
        </main>
    );
};

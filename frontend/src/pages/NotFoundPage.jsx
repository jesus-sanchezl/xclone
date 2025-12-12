import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export const NotFoundPage = () => {

    useEffect(() => {
  document.title = "Página no encontrada";
}, []);


    return (
        <Box
            component="section"
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                textAlign: "center",
                p: 2,
            }}
        >
            <Typography
                variant="h5"
                fontWeight={700}
                sx={{ letterSpacing: "-0.2px", lineHeight: 1.3 }}
            >
                La página que buscas no existe
            </Typography>

            <Button
                variant="contained"
                component={Link}
                to="/"
                sx={{
                    borderRadius: "999px",
                    mt: 1,
                    bgcolor: "black",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                        bgcolor: "#222",
                    },
                }}
            >
                Volver al inicio
            </Button>
        </Box>
    );
};

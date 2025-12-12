import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { PageWrapper } from "../components/Layout/PageWrapper";

export const ComingSoonPage = ({ title = "Sección en desarrollo" }) => {
    const navigate = useNavigate();

    useEffect(() => {
  document.title = "Sección en desarrollo";
}, []);

    return (
        <PageWrapper>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #e6ecf0",
                        px: 2,
                        py: 1.5,
                        position: "sticky",
                        top: 0,
                        bgcolor: "white",
                        zIndex: 10,
                    }}
                >
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{ mr: 2 }}
                        aria-label="Volver"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" fontWeight="bold">
                        {title}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        px: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h5" fontWeight="bold" mb={1}>
                            {title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Esta funcionalidad aún no está disponible.
                            ¡Próximamente!
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </PageWrapper>
    );
};

ComingSoonPage.propTypes = {
    title: PropTypes.string,
};

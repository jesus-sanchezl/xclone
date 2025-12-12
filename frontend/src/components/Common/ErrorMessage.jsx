import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";

export const ErrorMessage = ({ message }) => {
    return (
        <Box
            component="section"
            role="alert"
            aria-live="assertive"
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 2,
                px: 2,
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    color: "text.secondary",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    mb: 1,
                }}
            >
                {message}
            </Typography>

            <Button
                variant="contained"
                onClick={() => window.location.reload()}
                sx={{
                    bgcolor: "black",
                    color: "white",
                    borderRadius: "9999px",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    "&:hover": { bgcolor: "#222" },
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
            >
                Recargar página
            </Button>
        </Box>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.string,
};

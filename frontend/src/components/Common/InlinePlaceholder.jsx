import PropTypes from "prop-types";
import { Box } from "@mui/material";

export const InlinePlaceholder = ({
    title = "Sección en desarrollo",
    message = "Esta funcionalidad aún no está disponible. ¡Próximamente!",
}) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            py: 6,
            textAlign: "center",
            borderTop: "1px solid #e6ecf0",
            borderBottom: "1px solid #e6ecf0",
        }}
        role="status"
        aria-live="polite"
    >
        <Box>
            <Box sx={{ fontSize: 20, fontWeight: 700, mb: 1 }}>{title}</Box>
            <Box sx={{ color: "text.secondary" }}>{message}</Box>
        </Box>
    </Box>
);

InlinePlaceholder.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
};

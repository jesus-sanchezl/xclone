import { Box } from "@mui/material";
import PropTypes from "prop-types";

export const PageWrapper = ({ children }) => {
    return (
        <Box
            sx={{
                maxWidth: { xs: "100%", sm: 600, md: 700, lg: 800 },
                ml: { xs: 0, sm: "auto" },
                mr: { xs: 0, sm: "auto" },
                minHeight: "100vh",
                bgcolor: "#fff",
                borderLeft: "1px solid #e6ecf0",
                borderRight: "1px solid #e6ecf0",
                boxSizing: "border-box",
                overflowX: "hidden",
            }}
        >
            {children}
        </Box>
    );
};

PageWrapper.propTypes = {
    children: PropTypes.node,
};

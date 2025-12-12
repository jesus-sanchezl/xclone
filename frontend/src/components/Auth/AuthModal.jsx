import PropTypes from "prop-types";

import { Dialog, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const AuthModal = ({ open, onClose, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-modal="true"
            aria-labelledby="authmodal-close-button"
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    overflow: "hidden",
                    bgcolor: "#fff",
                    boxShadow: "none",
                    width: { xs: "100%", sm: 600 },
                    maxWidth: "90vw",
                    minHeight: 600,
                },
            }}
            BackdropProps={{
                sx: { backgroundColor: "rgba(0,0,0,0.65)" },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    p: "1.5rem 0 2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
                <IconButton
                    id="authmodal-close-button"
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    sx={{
                        position: "absolute",
                        top: "12px",
                        left: "16px",
                        color: "#0f1419",
                        fontSize: "1.3rem",
                    }}
                >
                    <CloseIcon sx={{ fontSize: "1.4rem" }} />
                </IconButton>

                {children}
            </Box>
        </Dialog>
    );
};

AuthModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

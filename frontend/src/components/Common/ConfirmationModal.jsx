import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
} from "@mui/material";

export const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title = "¿Estás seguro?",
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    loading = false,
    icon = null,
    destructive = false,
}) => {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="xs"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-desc"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: 8,
                    px: 2,
                },
            }}
            slotProps={{
                backdrop: { sx: { backdropFilter: "blur(2px)" } },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 2,
                }}
            >
                {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}

                <DialogTitle
                    id="confirm-title"
                    sx={{ p: 0, mb: 1, textAlign: "center", fontWeight: 800 }}
                >
                    {title}
                </DialogTitle>

                {description && (
                    <DialogContent sx={{ p: 0, mb: 2 }}>
                        <Typography
                            id="confirm-desc"
                            variant="body2"
                            sx={{ textAlign: "center", px: 1.5 }}
                        >
                            {description}
                        </Typography>
                    </DialogContent>
                )}

                <DialogActions
                    sx={{
                        width: "100%",
                        flexDirection: "column",
                        gap: 1,
                        pb: 2,
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        disableElevation
                        disabled={loading}
                        onClick={onConfirm}
                        sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 99,
                            height: 40,
                            ...(destructive
                                ? {}
                                : {
                                      backgroundColor: "black",
                                      "&:hover": { backgroundColor: "#222" },
                                  }),
                        }}
                        color={destructive ? "error" : "primary"}
                    >
                        {loading ? "Procesando…" : confirmText}
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        disabled={loading}
                        onClick={onClose}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 99,
                            height: 40,
                            borderColor: "#cfd9de",
                            color: "#0f1419",
                            "&:hover": {
                                backgroundColor: "#f7f9f9",
                                borderColor: "#cfd9de",
                            },
                        }}
                        autoFocus
                    >
                        {cancelText}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

ConfirmationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.node,
    description: PropTypes.node,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    loading: PropTypes.bool,
    icon: PropTypes.node,
    destructive: PropTypes.bool,
};

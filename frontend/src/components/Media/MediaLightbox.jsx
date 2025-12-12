import PropTypes from "prop-types";
import { Dialog, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const MediaLightbox = ({
    open,
    onClose,
    src,
    type = "image",
    alt = "",
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.85)" } }}
            PaperProps={{
                sx: {
                    background: "transparent",
                    boxShadow: "none",
                    overflow: "hidden",
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: { xs: 1.5, sm: 2 },
                    height: "100vh",
                }}
            >
                <Box
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    sx={{
                        position: "fixed",
                        top: 8,
                        right: 8,
                        width: 64,
                        height: 64,
                        zIndex: 1301,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        sx={{
                            bgcolor: "rgba(255,255,255,0.9)",
                            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                            boxShadow: 1,
                        }}
                        aria-label="Cerrar visor de media"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        width: { xs: "92vw", sm: "92vw" },
                        height: { xs: "92vh", sm: "92vh" },
                        maxWidth: 1200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        overflow: "hidden",
                    }}
                >
                    {type === "video" ? (
                        <Box
                            component="video"
                            src={src}
                            controls
                            autoPlay
                            muted
                            playsInline
                            preload="metadata"
                            sx={{
        maxWidth: "90vw",
        maxHeight: "85vh",
        width: "auto",
        height: "auto",
        objectFit: "contain",
        borderRadius: 1,
        display: "block",
    }}
                        />
                    ) : (
                        <Box
                            component="img"
                            src={src}
                            alt={alt}
                            loading="lazy"
                             sx={{
        maxWidth: "90vw",     // 👈 no crece más del 90% del ancho de pantalla
        maxHeight: "85vh",    // 👈 no crece más del 85% del alto
        width: "auto",
        height: "auto",
        objectFit: "contain",
        borderRadius: 1,
        display: "block",
    }}
                        />
                    )}
                </Box>
            </Box>
        </Dialog>
    );
};

MediaLightbox.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["image", "video"]),
    alt: PropTypes.string,
};

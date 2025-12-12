import PropTypes from "prop-types";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

export const RegisterProfileImage = ({
    image,
    setImage,
    onContinue,
    defaultProfileImage,
}) => {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <>
            <Box
                sx={{
                    paddingBottom: 9,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="start"
                    mb={1}
                >
                    Elige una imagen de perfil
                </Typography>

                <Typography
                    variant="body2"
                    textAlign="start"
                    color="text.secondary"
                    mb={3}
                >
                    ¿Tienes una selfie favorita? Súbela ahora
                </Typography>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 3,
                    }}
                >
                    <Box sx={{ position: "relative", width: 224, height: 224 }}>
                        <Avatar
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : defaultProfileImage
                            }
                            alt="Imagen de perfil"
                            sx={{
                                width: "100%",
                                height: "100%",
                                border: "4px solid white",
                                boxShadow: 3,
                            }}
                        />

                        <IconButton
                            component="label"
                            aria-label="Cambiar imagen de perfil"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "rgba(0,0,0,0.6)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                },
                            }}
                        >
                            <CameraAlt />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box mt={2} width="100%">
                <Button
                    variant={image ? "contained" : "outlined"}
                    fullWidth
                    type="button"
                    onClick={onContinue}
                    sx={{
                        textTransform: "none",
                        fontWeight: image ? "bold" : "normal",
                        borderRadius: "9999px",
                        py: 1.5,
                        fontSize: "15px",
                        backgroundColor: image ? "black" : "#f7f9f9",
                        color: image ? "white" : "#0f1419",
                        borderColor: image ? "black" : "#cfd9de",
                        "&:hover": {
                            backgroundColor: image ? "#333" : "#e1e8ed",
                            borderColor: image ? "black" : "#cfd9de",
                        },
                    }}
                >
                    {image ? "Siguiente" : "Descartar por ahora"}
                </Button>
            </Box>
        </>
    );
};

RegisterProfileImage.propTypes = {
    image: PropTypes.object,
    setImage: PropTypes.func.isRequired,
    onContinue: PropTypes.func.isRequired,
    defaultProfileImage: PropTypes.string.isRequired,
};

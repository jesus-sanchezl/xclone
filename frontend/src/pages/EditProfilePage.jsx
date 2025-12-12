import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import {
    Box,
    Avatar,
    Typography,
    Button,
    CardMedia,
    CardContent,
    TextField,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { CameraAlt as CameraIcon } from "@mui/icons-material";
import { format } from "date-fns";

import { AuthContext } from "../context/AuthContext";

import {
    getMyUserDataService,
    updateUserCoverImageService,
    updateUserDataService,
    updateUserProfileImageService,
} from "../services/user/userServices";

import { BackButton } from "../components/Common/BackButton";
import { ErrorMessage } from "../components/Common/ErrorMessage";
import { PageWrapper } from "../components/Layout/PageWrapper";
import { ConfirmationModal } from "../components/Common/ConfirmationModal";

import defaultCover from "../assets/default_cover.png";
import defaultImage from "../assets/default_profile.jpeg";

export const EditProfilePage = () => {
    const { user, token, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        bio: "",
        location: "",
        birthdate: "",
    });

    const [currentProfileImage, setCurrentProfileImage] = useState(null);
    const [currentCoverImage, setCurrentCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [usernameError, setUsernameError] = useState("");
    const [imageError, setImageError] = useState("");

    const [focusedField, setFocusedField] = useState(null);

    const [submitted, setSubmitted] = useState(false);

    const [edited, setEdited] = useState({
        name: false,
        username: false,
        bio: false,
        location: false,
        birthdate: false,
    });

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        const loadUserData = async () => {
            try {
                setLoading(true);

                const userData = await getMyUserDataService(token);
                setFormData({
                    name: userData.name || "",
                    username: userData.username || "",
                    bio: userData.bio || "",
                    location: userData.location || "",
                    birthdate: userData.birthdate
                        ? format(new Date(userData.birthdate), "yyyy-MM-dd")
                        : "",
                });
                setCurrentCoverImage(
                    userData.cover_image
                        ? `${import.meta.env.VITE_BACKEND}/images/${
                              userData.cover_image
                          }`
                        : defaultCover
                );
                setCurrentProfileImage(
                    userData.profile_image
                        ? `${import.meta.env.VITE_BACKEND}/images/${
                              userData.profile_image
                          }`
                        : defaultImage
                );
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e, type) => {
        setImageError(""); // 👈 limpia el error de imagen
        const file = e.target.files[0];
        if (type === "profile") {
            setProfileImage(file);
            setCurrentProfileImage(URL.createObjectURL(file));
        } else {
            setCoverImage(file);
            setCurrentCoverImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const name = formData.name.trim();
        const username = formData.username.trim();
        const location = formData.location.trim();

        let ok = true;

        if (name.length < 3 || name.length > 50) ok = false;
        if (username.length < 4 || username.length > 120) ok = false;
        if (location.length > 100) ok = false;

        if (!ok) return;

        setShowModal(true);
    };

    const handleConfirmUpdate = async () => {
        setLoading(true);
        setError(null);

        try {
            
            const cleanedFormData = {
                ...formData,
                name: formData.name.trim(),
                username: formData.username.trim(),
                location: formData.location.trim(),
                bio: formData.bio.trim(),
            };

        
            const formDataText = new FormData();
            Object.keys(cleanedFormData).forEach((key) => {
                formDataText.append(key, cleanedFormData[key]);
            });

            await updateUserDataService({ token, formData: formDataText });

            
            if (coverImage) {
                const formDataCover = new FormData();
                formDataCover.append("cover_image", coverImage);
                await updateUserCoverImageService({
                    token,
                    formData: formDataCover,
                });
            }

            
            if (profileImage) {
                const formDataProfile = new FormData();
                formDataProfile.append("profile_image", profileImage);
                await updateUserProfileImageService({
                    token,
                    formData: formDataProfile,
                });
            }

        
            const updatedUser = await getMyUserDataService(token);
            updateUser(updatedUser);
            navigate(`/user/${user.id}`);
        } catch (error) {
            
            if (
                typeof error?.message === "string" &&
                error.message.toLowerCase().includes("ya existe usuario")
            ) {
                setUsernameError("Ese nombre de usuario ya está en uso.");
                setFocusedField("username");
                return;
            }
            if (
                typeof error?.message === "string" &&
                error.message.toLowerCase().includes("debe ser una imagen")
            ) {
                setImageError(
                    "El archivo debe ser una imagen (png, jpg o jpeg)."
                );
                return;
            }

            if (
                error?.message === "Failed to fetch" ||
                error?.name === "TypeError"
            ) {
                setError(
                    "No se ha podido conectar con el servidor. Inténtalo de nuevo más tarde."
                );
                return;
            }

            setError(error?.message || "Ha ocurrido un error inesperado.");
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    const Counter = ({ value, max }) => (
        <Box
            sx={{
                position: "absolute",
                top: 6,
                right: 12,
                fontSize: "0.75rem",
                color: value >= max ? "error.main" : "text.disabled",
                pointerEvents: "none",
            }}
        >
            {value}/{max}
        </Box>
    );

    Counter.propTypes = {
        value: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
    };
    return (
        <PageWrapper>
            <Box sx={{ bgcolor: "white", borderRadius: 2, overflow: "hidden" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1,
                        height: "60px",
                        borderBottom: "1px solid #e0e0e0",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <BackButton />
                        <Typography variant="h6" fontWeight="bold">
                            Editar perfil
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={currentCoverImage}
                        alt="Portada"
                    />
                    <IconButton
                        component="label"
                        aria-label="Cambiar imagen de portada"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "rgba(0,0,0,0.3)",
                            color: "#A0A0A0",
                        }}
                    >
                        <CameraIcon />
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => handleImageChange(e, "cover")}
                        />
                    </IconButton>

                    <Avatar
                        src={currentProfileImage}
                        sx={{
                            width: 100,
                            height: 100,
                            position: "absolute",
                            bottom: -40,
                            left: 20,
                            border: "4px solid white",
                        }}
                    />
                    <IconButton
                        component="label"
                        aria-label="Cambiar foto de perfil"
                        sx={{
                            position: "absolute",
                            bottom: -10,
                            left: 50,
                            bgcolor: "rgba(0,0,0,0.3)",
                            color: "#A0A0A0",
                        }}
                    >
                        <CameraIcon />
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => handleImageChange(e, "profile")}
                        />
                    </IconButton>
                </Box>

                {imageError && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ mt: 1, textAlign: "center" }}
                    >
                        {imageError}
                    </Typography>
                )}

                <CardContent sx={{ mt: 6 }}>
                    {error && <ErrorMessage message={error} />}
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Nombre"
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                });
                                if (!edited.name)
                                    setEdited((p) => ({ ...p, name: true }));
                            }}
                            onFocus={() => setFocusedField("name")}
                            margin="normal"
                            inputProps={{ maxLength: 50 }}
                            error={
                                (submitted || edited.name) &&
                                (formData.name.trim().length === 0 ||
                                    formData.name.trim().length < 3 ||
                                    formData.name.trim().length >= 50)
                            }
                            helperText={
                                (submitted || edited.name) && //
                                (formData.name.trim().length === 0
                                    ? "El nombre no puede estar en blanco."
                                    : formData.name.trim().length < 3
                                    ? "El nombre debe tener al menos 3 caracteres."
                                    : formData.name.trim().length >= 50
                                    ? "El nombre puede tener como máximo 50 caracteres."
                                    : undefined)
                            }
                            InputProps={{
                                endAdornment:
                                    focusedField === "name" ? (
                                        <Counter
                                            value={(formData.name || "").length}
                                            max={50}
                                        />
                                    ) : null,
                            }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    position: "relative",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            name="username"
                            label="Nombre de usuario"
                            value={formData.username}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                });
                                if (!edited.username)
                                    setEdited((p) => ({
                                        ...p,
                                        username: true,
                                    }));
                                if (usernameError) setUsernameError("");
                            }}
                            onFocus={() => setFocusedField("username")}
                            margin="normal"
                            inputProps={{ maxLength: 120 }}
                            error={
                                (submitted || edited.username) &&
                                (!!usernameError ||
                                    formData.username.trim().length === 0 ||
                                    formData.username.trim().length < 4 ||
                                    formData.username.trim().length >= 120)
                            }
                            helperText={
                                (submitted || edited.username) &&
                                (usernameError
                                    ? usernameError
                                    : formData.username.trim().length === 0
                                    ? "El nombre de usuario no puede estar en blanco."
                                    : formData.username.trim().length < 4
                                    ? "El nombre de usuario debe tener al menos 4 caracteres."
                                    : formData.username.trim().length >= 120
                                    ? "El nombre de usuario puede tener como máximo 120 caracteres."
                                    : undefined)
                            }
                            InputProps={{
                                endAdornment:
                                    focusedField === "username" ? (
                                        <Counter
                                            value={
                                                (formData.username || "").length
                                            }
                                            max={120}
                                        />
                                    ) : null,
                            }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    position: "relative",
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            name="bio"
                            label="Biografía"
                            value={formData.bio}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("bio")}
                            onBlur={() => setFocusedField(null)}
                            multiline
                            rows={3}
                            margin="normal"
                            inputProps={{ maxLength: 200 }}
                            error={formData.bio.trim().length >= 200}
                            helperText={
                                formData.bio.trim().length >= 200
                                    ? "Has alcanzado el máximo de 200 caracteres"
                                    : undefined
                            }
                            InputProps={{
                                endAdornment:
                                    focusedField === "bio" ? (
                                        <Counter
                                            value={(formData.bio || "").length}
                                            max={200}
                                        />
                                    ) : null,
                            }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    position: "relative",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            name="location"
                            label="Ubicación"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value,
                                })
                            }
                            onFocus={() => setFocusedField("location")}
                            onBlur={() => setFocusedField(null)}
                            margin="normal"
                            inputProps={{ maxLength: 100 }}
                            error={formData.location.trim().length >= 100}
                            helperText={
                                formData.location.trim().length >= 100
                                    ? "Has alcanzado el máximo de 100 caracteres"
                                    : undefined
                            }
                            InputProps={{
                                endAdornment:
                                    focusedField === "location" ? (
                                        <Counter
                                            value={
                                                (formData.location || "").length
                                            }
                                            max={100}
                                        />
                                    ) : null,
                            }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    position: "relative",
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            name="birthdate"
                            type="date"
                            value={formData.birthdate}
                            onChange={handleChange}
                            margin="normal"
                        />

                        <Box sx={{ textAlign: "right", mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: 20,
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    minWidth: 80,
                                }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    "Guardar"
                                )}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>

                <ConfirmationModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirmUpdate}
                    loading={loading}
                    title="¿Deseas guardar los cambios?"
                    description="Se actualizará tu información de perfil."
                    confirmText="Guardar cambios"
                    cancelText="Cancelar"
                />
            </Box>
        </PageWrapper>
    );
};

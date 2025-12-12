import { useContext } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import EmojiPicker from "emoji-picker-react";
import {
    Box,
    TextField,
    Avatar,
    IconButton,
    Button,
    Divider,
    Popover,
} from "@mui/material";
import {
    Photo as PhotoIcon,
    VideoLibrary as VideoLibraryIcon,
    Gif as GifIcon,
    EmojiEmotions as EmojiEmotionsIcon,
} from "@mui/icons-material";

import { AuthContext } from "../../context/AuthContext";

import { usePostForm } from "../../hooks/usePostForm";

import defaultImage from "../../assets/default_profile.jpeg";

export const TweetFormInline = ({
    onSubmit,
    onAdd,
    onClose,
    placeholder = "¿Qué está pasando?",
    buttonText = "Postear",
}) => {
    const { user } = useContext(AuthContext);

    const {
        content,
        media,
        preview,
        sending,
        error,
        remaining,
        nearLimit,
        overLimit,
        emojiAnchor,
        emojiOpen,
        setContent,
        handleForm,
        handleFileChange,
        removeMedia,
        handleOpenEmoji,
        handleCloseEmoji,
        handleEmojiPick,
    } = usePostForm({
        onSubmit,
        onAdd,
        onClose,
        emptyErrorMessage: "El tweet no puede estar vacío",
        limit: 280,
    });

    return (
        <Box sx={{ borderBottom: "1px solid #e6ecf0", width: "100%" }}>
            <Box
                component="form"
                onSubmit={handleForm}
                sx={{
                    maxWidth: 600,
                    mx: 1.5,
                    pt: 2,
                    pb: 1,
                    bgcolor: "white",
                }}
            >
                <Box display="flex" alignItems="flex-start" gap={2}>
                    {user && (
                        <Link to={`/user/${user.id}`}>
                            <Avatar
                                src={
                                    user?.profile_image
                                        ? `${
                                              import.meta.env.VITE_BACKEND
                                          }/images/${user.profile_image}`
                                        : defaultImage
                                }
                                sx={{ width: 48, height: 48 }}
                            />
                        </Link>
                    )}

                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            maxRows={6}
                            placeholder={placeholder}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                sx: { fontSize: 18, color: "#0f1419" },
                            }}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Box>

                {preview && (
                    <Box mt={2} sx={{ position: "relative" }}>
                        <IconButton
                            onClick={removeMedia}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                zIndex: 2,
                                bgcolor: "rgba(0,0,0,0.6)",
                                color: "#fff",
                                width: 32,
                                height: 32,
                                "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
                                borderRadius: "50%",
                            }}
                            aria-label="Eliminar archivo adjunto"
                        >
                            ✕
                        </IconButton>

                        <Box
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                            }}
                        >
                            {media?.type?.startsWith("image/") ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: "100%",
                                        display: "block",
                                        objectFit: "cover",
                                        maxHeight: 260,
                                    }}
                                />
                            ) : media?.type?.startsWith("video/") ? (
                                <video
                                    controls
                                    src={preview}
                                    style={{
                                        width: "100%",
                                        display: "block",
                                        borderRadius: 8,
                                        maxHeight: 280,
                                    }}
                                />
                            ) : null}
                        </Box>
                    </Box>
                )}

                <Divider
                    sx={{
                        my: 1,
                        borderColor: "#e6ecf0",
                        ml: "64px",
                    }}
                />

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    position="relative"
                    gap={2}
                    sx={{ pl: "64px" }}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <IconButton
                            component="label"
                            sx={{ p: 1, color: "#1d9bf0" }}
                            aria-label="Añadir imagen"
                        >
                            <PhotoIcon fontSize="small" />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
                            />
                        </IconButton>

                        <IconButton
                            component="label"
                            sx={{ p: 1, color: "#1d9bf0" }}
                            aria-label="Añadir vídeo"
                        >
                            <VideoLibraryIcon fontSize="small" />
                            <input
                                type="file"
                                accept="video/*"
                                hidden
                                onChange={handleFileChange}
                            />
                        </IconButton>

                        <IconButton
                            component="label"
                            sx={{ p: 1, color: "#1d9bf0" }}
                            aria-label="Añadir GIF"
                        >
                            <GifIcon fontSize="small" />
                            <input
                                type="file"
                                accept="image/gif"
                                hidden
                                onChange={handleFileChange}
                            />
                        </IconButton>

                        <IconButton
                            sx={{ p: 1, color: "#1d9bf0" }}
                            onClick={handleOpenEmoji}
                            aria-label="Abrir selector de emojis"
                        >
                            <EmojiEmotionsIcon fontSize="small" />
                        </IconButton>

                        <Popover
                            open={emojiOpen}
                            anchorEl={emojiAnchor}
                            onClose={handleCloseEmoji}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        mt: 1,
                                        borderRadius: 2,
                                        boxShadow: 6,
                                        p: 0,
                                    },
                                },
                            }}
                        >
                            <EmojiPicker
                                onEmojiClick={handleEmojiPick}
                                searchDisabled
                                skinTonesDisabled
                                lazyLoadEmojis
                                emojiStyle="native"
                                width={320}
                                height={360}
                                previewConfig={{ showPreview: false }}
                            />
                        </Popover>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                mr: 0.5,
                                fontSize: 12,
                                color: overLimit
                                    ? "error.main"
                                    : nearLimit
                                    ? "warning.main"
                                    : "text.secondary",
                            }}
                        >
                            {remaining}
                        </Box>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                mx: 1,
                                borderColor: "#e6ecf0",
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={sending || !content.trim() || overLimit}
                            sx={{
                                textTransform: "none",
                                borderRadius: "9999px",
                                backgroundColor:
                                    sending || !content.trim() || overLimit
                                        ? "#87898C"
                                        : "#000000",
                                "&:hover": {
                                    backgroundColor:
                                        sending || !content.trim() || overLimit
                                            ? "#87898C"
                                            : "#333333",
                                },
                                "&.Mui-disabled": {
                                    color: "#fff",
                                    backgroundColor: "#87898C",
                                },
                                fontWeight: "bold",

                                px: { xs: 2, sm: 2.5, md: 3 },
                                py: { xs: 0.35, sm: 0.5, md: 0.7 },
                                fontSize: { xs: 12, sm: 13, md: 14 },
                                minWidth: { xs: 76, sm: 90, md: 104 },
                            }}
                        >
                            {sending ? "Enviando..." : buttonText}
                        </Button>
                    </Box>
                </Box>

                {error && (
                    <Box mt={1} color="error.main" textAlign="center">
                        {error}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

TweetFormInline.propTypes = {
    onSubmit: PropTypes.func,
    onAdd: PropTypes.func,
    onClose: PropTypes.func,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
};

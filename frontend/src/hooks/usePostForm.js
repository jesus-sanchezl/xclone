import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const usePostForm = ({
    onSubmit,
    onAdd,
    onClose,
    emptyErrorMessage = "El post no puede estar vacío",
    limit = 280,
}) => {
    const { token } = useContext(AuthContext);

    const [content, setContent] = useState("");
    const [media, setMedia] = useState(null);
    const [preview, setPreview] = useState(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    // Emoji popover
    const [emojiAnchor, setEmojiAnchor] = useState(null);
    const emojiOpen = Boolean(emojiAnchor);

    const charsUsed = content.length;
    const remaining = limit - charsUsed;
    const nearLimit = remaining <= 20 && remaining >= 0;
    const overLimit = remaining < 0;

    const handleOpenEmoji = (e) => setEmojiAnchor(e.currentTarget);
    const handleCloseEmoji = () => setEmojiAnchor(null);

    const reset = () => {
        setContent("");
        setMedia(null);
        setPreview(null);
        setError("");
    };

    const removeMedia = () => {
        setMedia(null);
        setPreview(null);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        if (!content.trim()) {
            setError(emptyErrorMessage);
            return;
        }

        try {
            setSending(true);
            const data = new FormData();
            data.append("content", content);
            if (media) {
                data.append("media", media);
            }

            const response = await onSubmit({ data, token });

            if (onAdd) {
                onAdd(response);
            }
            reset();
            if (onClose) onClose();
        } catch (error) {
            setError(error.message || "Error inesperado");
        } finally {
            setSending(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file);
            setPreview(URL.createObjectURL(file));
        }

        e.target.value = "";
    };

    const handleEmojiPick = (emoji) => {
        setContent((prev) => prev + (emoji?.emoji || ""));
    };

    return {
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
        reset,
    };
};

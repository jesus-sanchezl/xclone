import { useState } from "react";

import PropTypes from "prop-types";
import { Dialog } from "@mui/material";

import { ConfirmationModal } from "../Common/ConfirmationModal";

export const NewTweetModal = ({ open, onClose, children }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleCloseRequest = (_, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            setConfirmOpen(true);
            return;
        }

        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseRequest}
            disableEscapeKeyDown
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    bgcolor: "#fff",
                    p: 0,
                    boxShadow: 8,
                    mt: 6,
                    alignSelf: "flex-start",
                    minHeight: 300,
                },
            }}
            BackdropProps={{
                sx: { backgroundColor: "rgba(0,0,0,0.65)" },
            }}
        >
            {children}

            <ConfirmationModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => {
                    setConfirmOpen(false);
                    onClose();
                }}
                title="¿Deseas descartar el post?"
                description="Perderás lo que has escrito."
                confirmText="Descartar"
                cancelText="Volver"
            />
        </Dialog>
    );
};

NewTweetModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

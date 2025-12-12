import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <IconButton
            onClick={handleBack}
            color="inherit"
            aria-label="Volver atrás"
            disableRipple
            disableFocusRipple
            sx={{
                backgroundColor: "transparent",
                width: 40,
                height: 40,
                borderRadius: "50%",
                "&:hover": {
                    backgroundColor: "lightgray",
                    borderRadius: "50%",
                },
            }}
        >
            <ArrowBackIcon sx={{ color: "black", fontSize: 18 }} />
        </IconButton>
    );
};

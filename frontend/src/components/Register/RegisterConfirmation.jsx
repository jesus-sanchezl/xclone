import { Box, Typography } from "@mui/material";

export const RegisterConfirmation = () => {
    return (
        <>
            <Box paddingBottom={38}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="start"
                    mb={2}
                >
                    ¡Todo listo!
                </Typography>

                <Typography variant="h6" textAlign="start" mb={2}>
                    Haz clic en “Confirmar” para crear tu cuenta
                </Typography>
            </Box>
        </>
    );
};

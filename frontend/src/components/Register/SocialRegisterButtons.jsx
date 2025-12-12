import PropTypes from "prop-types";
import { Button, Stack, Typography, Divider } from "@mui/material";

import AppleIcon from "@mui/icons-material/Apple";

import GoogleLogo from "../../assets/GoogleLogo.png";

export const SocialRegisterButtons = ({ handleSnackbarOpen }) => {
    return (
        <Stack
            spacing={2.2}
            mt={2}
            sx={{ width: "100%", alignItems: "center" }}
        >
            <Button
                type="button"
                aria-label="Registrarse con Google"
                variant="outlined"
                onClick={handleSnackbarOpen}
                sx={{
                    borderRadius: "9999px",
                    textTransform: "none",
                    color: "black",
                    borderColor: "#CFD9DE",
                    backgroundColor: "white",
                    fontWeight: 500,
                    "&:hover": {
                        backgroundColor: "#F0F5FE",
                    },
                    width: 350,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    gap: 1.5,
                    height: 40,
                }}
                disableRipple
                disableFocusRipple
            >
                <img
                    src={GoogleLogo}
                    alt="Google"
                    style={{ width: 18, height: 18 }}
                />
                <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ fontSize: "0.9rem", textTransform: "none" }}
                >
                    Registrarse con Google
                </Typography>
            </Button>

            <Button
                type="button"
                aria-label="Registrarse con Apple"
                variant="outlined"
                onClick={handleSnackbarOpen}
                sx={{
                    borderRadius: "9999px",
                    textTransform: "none",
                    color: "black",
                    borderColor: "#CFD9DE",
                    backgroundColor: "white",
                    fontWeight: 500,
                    "&:hover": {
                        backgroundColor: "#E6E6E6",
                    },
                    width: 350,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                    gap: 1.5,
                    height: 40,
                }}
                disableRipple
                disableFocusRipple
            >
                <AppleIcon sx={{ fontSize: 20 }} />
                <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ fontSize: "0.9rem", textTransform: "none" }}
                >
                    Registrarse con Apple
                </Typography>
            </Button>

            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ width: "350px", my: 2 }}
            >
                <Divider sx={{ flex: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    O
                </Typography>
                <Divider sx={{ flex: 1 }} />
            </Stack>
        </Stack>
    );
};

SocialRegisterButtons.propTypes = {
    handleSnackbarOpen: PropTypes.func.isRequired,
};

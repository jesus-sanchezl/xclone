import { Box } from "@mui/material";

import logoX from "../../assets/logoX.png";

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "white",
      }}
    >
      <Box
        component="img"
        src={logoX}
        alt="Logo X"
        sx={{
          width: 70,
          height: "auto",
        }}
      />
    </Box>
  );
};

import { Box, CircularProgress, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fff",
      }}
    >
      <SchoolIcon sx={{ fontSize: 100, color: "#1976d2", mb: 4 }} />
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;

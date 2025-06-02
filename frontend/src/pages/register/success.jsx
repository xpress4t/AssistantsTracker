import { Box, CircularProgress, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const RegisterSuccess = () => {
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
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ textAlign: "center" }}>
          ¡Registro completado!
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          Espera a que uno de los administradores te asigne un rol :)
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterSuccess;

import { Box, Typography, Paper, Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "linear-gradient(135deg, #1976d2 0%, #90caf9 60%, #f3e5f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 0,
          borderRadius: 6,
          minWidth: { md: 700 },
          maxWidth: { xs: "90%", md: 700 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          overflow: "hidden",
          backdropFilter: "blur(2px)",
          position: "relative",
        }}
      >
        <Button
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "#1976d2",
            bgcolor: "#fff",
            "&:hover": { bgcolor: "#e3f2fd" },
            zIndex: 2,
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          <Typography fontWeight={600} fontSize={15}>
            Volver
          </Typography>
        </Button>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 5, md: 8 },
            bgcolor: "#fff",
          }}
        >
          <SchoolIcon sx={{ fontSize: 100, color: "#1976d2", mb: 4 }} />
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{ textAlign: "center" }}
              fontSize={24}
              fontWeight={700}
            >
              ¡Registro completado!
            </Typography>
            <Typography sx={{ mt:"1",textAlign: "center" }} fontSize={16}>
              Espera a que uno de los administradores te asigne un rol 😃
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterSuccess;
// No aparece el nombre de Aula cuando le doy click en create
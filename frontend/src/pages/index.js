import { Box, Link, Typography, Paper, Avatar } from "@mui/material";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { useGlobalState } from "../context";
import SchoolIcon from "@mui/icons-material/School";
import api from "@/services";
import NextLink from "next/link";

export default function Home() {
  const { setUser } = useGlobalState();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await api.auth.login(email, password);
      setUser(data);
    } catch (error) {
      setError("Ocurrió un error. Intenta más tarde.", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 0,
          borderRadius: 4,
          minWidth: { md: 700 },
          maxWidth: { xs: "90%", md: 900 },
          width: "100%",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            bgcolor: "#1976d2",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100%",
            width: { xs: "100%", md: 280 },
            boxSizing: "border-box",
            p: 4,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#fff",
              color: "#1976d2",
              width: 72,
              height: 72,
              mb: 2,
            }}
          >
            <SchoolIcon sx={{ fontSize: 48 }} />
          </Avatar>

          <Typography align="center" fontSize={18}>
            Bienvenido al sistema de registro de asistencias.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 5,
            bgcolor: "#fff",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <Input
                id="email"
                label="Email"
                variant="standard"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
              />
              <Input
                id="password"
                label="Contraseña"
                variant="standard"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
              />
              {error && (
                <Typography color="error" fontSize={14} mt={1}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  fontWeight: 700,
                  letterSpacing: 1,
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
                  transition: "background 0.3s",
                  "&:hover": { background: "#1565c0" },
                }}
              >
                INICIAR SESIÓN
              </Button>
            </Box>
          </form>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography fontSize={15}>
              ¿No tienes una cuenta?{" "}
              <Link
                href="/register"
                underline="hover"
                color="primary"
                component={NextLink}
              >
                Regístrate
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

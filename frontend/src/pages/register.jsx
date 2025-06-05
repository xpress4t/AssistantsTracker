import {
  Box,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Avatar as MuiAvatar,
  Link,
} from "@mui/material";
import Input from "../components/Input";
import Button from "../components/Button";
import FileInput from "../components/FileInput";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/services";
import { useGlobalState } from "@/context";
import NextLink from "next/link";

export default function Home() {
  const { setUser } = useGlobalState();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);
    const res = await fetch("http://localhost/backend/users/uploadPhoto.php", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Error al subir la foto");
    const data = await res.json();
    return data.url;
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!name || !lastname || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      let photoUrl = "";
      if (photo) {
        photoUrl = await uploadPhoto(photo);
      }
      const user = await api.auth.register({
        name,
        lastname,
        email,
        password,
        photo: photoUrl,
      });
      // setUser(user);
      router.push("/register/success");
    } catch (e) {
      if (e?.field === "email") {
        setError(e.message);
      } else {
        setError("Error al registrar usuario.");
      }
    }
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
          boxShadow: "0 12px 40px 0 rgba(25, 118, 210, 0.18)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          overflow: "hidden",
          backdropFilter: "blur(2px)",
        }}
      >
        <Box
          sx={{
            bgcolor: "transparent",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100%",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          
          
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 3, md: 6 },
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <MuiAvatar
              src={preview}
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#1976d2",
                fontSize: 32,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                mb: 1,
              }}
            >
              {!preview && name ? name[0].toUpperCase() : ""}
            </MuiAvatar>
            <FileInput
              component="label"
              role={undefined}
              tabIndex="0"
              startIcon={<CloudUploadIcon />}
              text="Subir foto"
              color="primary"
              variant="contained"
              onChange={handlePhotoChange}
              sx={{ mt: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Input
              label="Nombres"
              variant="standard"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <Input
              label="Apellidos"
              variant="standard"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              fullWidth
            />
            <Input
              label="Email"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Input
              label="Contraseña"
              variant="standard"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography color="error" fontSize={14} mt={1}>
                {error}
              </Typography>
            )}
            <Button
              children="Registrarse"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                fontWeight: 700,
                letterSpacing: 1,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
                transition: "background 0.3s",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)",
                },
              }}
              onClick={handleRegister}
              fullWidth
            />
          </Box>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography fontSize={15}>
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/"
                underline="hover"
                color="primary"
                component={NextLink}
                fontWeight={600}
              >
                Inicia sesión
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

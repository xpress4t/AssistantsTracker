import { Box, Link, Typography } from "@mui/material";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { useGlobalState } from "../context";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useGlobalState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost/backend/login/";
      const payload = { email, password };
      const result = await fetch(url, {
        body: JSON.stringify(payload),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok) {
        return;
      }
      const data = await result.json();
      setUser(data);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
        >
          <Input
            id="email"
            label="Email"
            variant="standard"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            id="password"
            label="Password"
            variant="standard"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
          {/* Si hago solo una etiqueta no funcionará ya que estoy esperando que el texto del botón venga a través de children, pero en Home lo estoy pasando como text="Login", lo cual no se está renderizando porque text no es una prop reconocida dentro de Button.
        Asi que paso Login como texto entre la etiqueta de apertura y cierre */}
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>

        <Box>
          <Typography>
            ¿No tienes una cuenta? <Link href="/register">Regístrate</Link>
          </Typography>
        </Box>
      </Box>
    </form>
  );
}

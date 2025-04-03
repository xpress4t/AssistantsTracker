import { Box, Link, Typography } from "@mui/material";
import Button from "../components/Button";
import Input from "../components/Input";

const test = async () => {
  const url = "http://localhost/backend/login/";
  const payload = { email:"pepitoLosPalotes@gmail.com", password:"123456789" };
  const result = await fetch(url, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  console.log(data);
};

export default function Home() {
  test();

  return (
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
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
        />
        <Input
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: 300 }}>
        {/* Si hago solo una etiqueta no funcionará ya que estoy esperando que el texto del botón venga a través de children, pero en Home lo estoy pasando como text="Login", lo cual no se está renderizando porque text no es una prop reconocida dentro de Button.
        Asi que paso Login como texto entre la etiqueta de apertura y cierre */}
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Box>

      <Box>
        <Typography>
          Aún no tienes una cuenta? <Link href="/register">Regístrate</Link>
        </Typography>
      </Box>
    </Box>
  );
}

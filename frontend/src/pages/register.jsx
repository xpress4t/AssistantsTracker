import { Box } from "@mui/material";
import Input from "../components/Input";
import Button from "../components/Button";
import FileInput from "../components/FileInput";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "../components/Avatar";
import { useState } from "react";
import { useRouter } from "next/router";
import { createUser } from "../services/users";

export default function Home() {
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
          label="Nombres"
          variant="standard"
          type="text"
        />
        <Input
          id="standard-basic"
          label="Apellidos"
          variant="standard"
          type="text"
        />
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
      <Box>
        <FileInput
          component="label"
          role={undefined}
          tabIndex="0"
          startIcon={<CloudUploadIcon />}
          text="Subir foto"
          color="primary"
          variant="contained"
          multiple
          onChange={(event) => console.log(event.target.files)}
        />
      </Box>
      <Box>
        <Button
          children="Registrarse"
          variant="contained"
          color="primary"
        />
      </Box>
    </Box>
  );
}

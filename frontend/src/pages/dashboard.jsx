import { useGlobalState } from "@/context";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AppBar from "../components/AppBar";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  const { user } = useGlobalState();
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar title={"Bienvenido, " + user.name} />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 4,
            fontSize: { xs: "3rem", sm: "5rem", md: "7rem" },
            fontWeight: "bold",
            letterSpacing: "0.1em",
          }}
        >
          {time.toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;

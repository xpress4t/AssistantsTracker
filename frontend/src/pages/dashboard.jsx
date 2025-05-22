import { useGlobalState } from "@/context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppBar from "../components/AppBar";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

const Dashboard = () => {
  const { user } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <AppBar title={"Bienvenido, " + user.name} />
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Card sx={{ maxWidth: 280, mt: 12, ml: 4 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;

import { useGlobalState } from "@/context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "../components/IconButton";
import AppBar from "../components/AppBar";
import Button from "../components/Button";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dashboard = () => {
  const { user } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user) {
    // Por si cargo dashboard directamente, o sea copiando y pegando link
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" color="inherit" sx={{ fontSize: "24px" }}>
            Bienvenido, {user.name}
          </Typography>

          <Box sx={{ marginLeft: "auto" }}>
            <IconButton size="large" color="inherit">
              <MailIcon />
            </IconButton>
            <IconButton size="large" color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton size="large" color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/studentManagement")}
        >
          Lista de estudiantes
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;

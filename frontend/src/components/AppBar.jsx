import { useGlobalState } from "@/context";
import { Home } from "@mui/icons-material";
import { Button, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useRouter } from "next/router";

const studentPages = [
  { icon: <Home />, href: "/dashboard" },
  { label: "Attendance", href: "/attendance" },
];

const teacherPages = [...studentPages];

const adminPages = [
  { icon: <Home />, href: "/dashboard" },
  { label: "users", href: "/users" },
  { label: "subjects", href: "/subjects" },
  { label: "courses", href: "/courses" },
  { label: "Attendance", href: "/attendance" },
];

const AppBar = ({ title }) => {
  const { user } = useGlobalState();
  const { push } = useRouter();

  // let pages = [];
  let pages = adminPages;
  if (user?.roleId === "1") pages = adminPages;
  else if (user?.roleId === "2") pages = teacherPages;
  else if (user?.roleId === "3") pages = studentPages;

  const onClick = (path) => {
    push(path);
  };

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography
          variant="body1"
          color="inherit"
          sx={{ fontSize: "24px", fontFamily: " Arial" }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            gap: 2,
            fontFamily: "arial",
          }}
        >
          {pages.map((page) => {
            const props = {
              color: "inherit",
              onClick: () => onClick(page.href),
              variant: "outlined",
              sx: {
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                fontFamily: "Arial",
                fontSize: "16px",
                borderRadius: "6px",
                border: "none",
                px: 2,
              },
            };

            if (page.label) {
              return (
                <Button {...props} key={page.href} startIcon={page.icon}>
                  {page.label}
                </Button>
              );
            }

            return (
              <IconButton {...props} key={page.href} >
                {page.icon}
              </IconButton>
            );
          })}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;

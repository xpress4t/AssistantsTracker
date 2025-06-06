import { useGlobalState } from "@/context";
import { Home } from "@mui/icons-material";
import {
  Button,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import api from "@/services";

const commonPages = [{ icon: <Home />, href: "/dashboard" }];

const studentPages = [
  ...commonPages,
  { label: "Attendance", href: "/attendance" },
];

const teacherPages = [...studentPages];

const adminPages = [
  ...commonPages,
  { label: "Courses", href: "/courses" },
  { label: "Subjects", href: "/subjects" },
  { label: "Users", href: "/users" },
];

const AppBar = ({ title }) => {
  const { user, setUser } = useGlobalState();
  const { push } = useRouter();

  let pages = [];
  if (user?.roleId === "1") pages = adminPages;
  else if (user?.roleId === "2") pages = teacherPages;
  else if (user?.roleId === "3") pages = studentPages;

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuClick = (href) => {
    push(href);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    api.auth.logout();
    setUser(undefined);
  };

  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="body1"
            color="inherit"
            sx={{
              fontSize: "24px",
              fontFamily: "Arial",
              display: { xs: "none", md: "flex" },
              mr: 2,
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.href}
                  onClick={() => handleMenuClick(page.href)}
                >
                  <Typography textAlign="center" width="100%">
                    {page.icon} {page.label}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center" width="100%">
                  <LogoutIcon sx={{ color: "black" }} />
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body1"
                color="inherit"
                sx={{
                  fontSize: "20px",
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>
            </Box>
            <Avatar alt={user?.name} src={user?.photo} sx={{ marginRight: 0 }}>
              {user?.name?.[0]}
            </Avatar>
          </Box>

          <Box
            sx={{
              marginLeft: "auto",
              display: { xs: "none", md: "flex" },
              gap: 2,
              fontFamily: "Arial",
            }}
          >
            {pages.map((page) => {
              const props = {
                color: "inherit",
                onClick: () => push(page.href),
                variant: "text",
              };

              if (page.label) {
                return (
                  <Button {...props} key={page.href} startIcon={page.icon}>
                    {page.label}
                  </Button>
                );
              }
              
              return (
                <IconButton {...props} key={page.href} sx={{ borderRadius: 1 }}>
                  {page.icon}
                </IconButton>
              );
            })}

            <Avatar alt={user?.name} src={user?.photo}>
              {user?.name?.[0]}
            </Avatar>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{ borderRadius: 1 }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;

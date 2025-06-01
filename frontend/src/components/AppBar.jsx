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
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const studentPages = [
  { icon: <Home />, href: "/dashboard" },
  { label: "Attendance", href: "/attendance" },
];

const teacherPages = [...studentPages];

const adminPages = [
  { icon: <Home />, href: "/dashboard" },
  { label: "Users", href: "/users" },
  { label: "Subjects", href: "/subjects" },
  { label: "Courses", href: "/courses" },
  { label: "Attendance", href: "/attendance" },
];

const AppBar = ({ title }) => {
  const { user } = useGlobalState();
  const { push } = useRouter();

  let pages = adminPages;
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
            </Menu>
          </Box>

          <Typography
            variant="body1"
            color="inherit"
            sx={{
              fontSize: "20px",
              fontFamily: "Arial",
              display: { xs: "flex", md: "none" },
              flex: 1,
              justifyContent: "center",
              maxWidth: `calc(100% - ${48 * 2}px)`,
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              marginLeft: "auto",
              display: { xs: "none", md: "flex" },
              gap: 2,
              fontFamily: "Arial",
            }}
          >
            {pages.map((page) =>
              page.label ? (
                <Button
                  color="inherit"
                  onClick={() => push(page.href)}
                  variant="outlined"
                  key={page.href}
                  startIcon={page.icon}
                  sx={{
                    alignItems: "center",
                    fontFamily: "Arial",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: "none",
                    px: 2,
                  }}
                >
                  {page.label}
                </Button>
              ) : (
                <IconButton
                  color="inherit"
                  onClick={() => push(page.href)}
                  key={page.href}
                  sx={{
                    alignItems: "center",
                    fontFamily: "Arial",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: "none",
                    px: 2,
                  }}
                >
                  {page.icon}
                </IconButton>
              )
            )}
          </Box>
          <IconButton
            color="inherit"
            onClick={() => {
              push("/");
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;

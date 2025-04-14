import MuiAppBar from "@mui/material/AppBar";

const AppBar = ({ position, sx, color, children }) => {
  return (
    <MuiAppBar position={position} sx={sx} color={color}>
      {children}
    </MuiAppBar>
  );
};

export default AppBar;

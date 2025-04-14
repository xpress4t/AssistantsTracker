import MuiCard from "@mui/material/Card";

const Card = ({ children, sx, raised }) => {
  return (
    <MuiCard sx={sx} raised={raised}>
      {children}
    </MuiCard>
  );
};

export default Card;
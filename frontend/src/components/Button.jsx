import MuiButton from "@mui/material/Button";

const Button = ({
  children,
  component,
  role,
  variant = "",
  tabIndex,
  startIcon,
  color = "",
  onClick
}) => {
  return (
    <MuiButton
      component={component}
      role={role}
      variant={variant}
      tabIndex={tabIndex}
      startIcon={startIcon}
      color={color}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

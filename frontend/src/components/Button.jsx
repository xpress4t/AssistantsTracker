import MuiButton from "@mui/material/Button";

const Button = ({
  children,
  component,
  role,
  variant = "",
  tabIndex,
  startIcon,
  color = "",
  type,
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
      type={type}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

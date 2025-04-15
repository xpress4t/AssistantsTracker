import MuiButton from "@mui/material/Button";

const Button = ({
  children,
  component,
  role,
  size,
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
      size={size}
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

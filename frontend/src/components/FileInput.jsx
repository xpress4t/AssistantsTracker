import Button from "./Button";
import { Input } from "@mui/material";

const FileInput = ({
  component,
  role,
  tabIndex,
  startIcon,
  text,
  color,
  variant,
  onChange,
  onClick,
}) => {
  return (
    <Button
      component={component}
      role={role}
      variant={variant}
      tabIndex={tabIndex}
      startIcon={startIcon}
      color={color}
      onClick={onClick}
    >
      {text}
      <Input
        type="file"
        onChange={onChange}
        multiple
        sx={{ display: "none" }}
      />
    </Button>
  );
};

export default FileInput;

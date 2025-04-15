import MuiInput from "@mui/material/TextField";

const Input = ({
  id,
  label,
  variant,
  placeholder,
  type = "text",
  sx,
  onChange,
  color,
  defaultValue,
}) => {
  return (
    <MuiInput
      sx={sx}
      id={id}
      name={id}
      label={label}
      variant={variant}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      color={color}
      defaultValue={defaultValue}
    />
  );
};

export default Input;

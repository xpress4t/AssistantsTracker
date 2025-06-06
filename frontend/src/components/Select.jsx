import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";

const Select = ({
  id,
  name,
  label,
  options = [],
  defaultValue = [],
  error,
  renderValue,
  getOptionLabel,
  endAdornment,
  multiple,
  onClear,
  width = "100%",
  size,
  sx,
  ...props
}) => {
  const defaultRenderValue = (selectedIds) => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {selectedIds.map((optionId) => {
        const option = options.find((o) => o.id === optionId);
        return <Chip key={optionId} label={getOptionLabel(option)} />;
      })}
    </Box>
  );

  return (
    <FormControl sx={{ ...sx, width }} size={size}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        id={id}
        name={name}
        multiple={multiple}
        defaultValue={defaultValue}
        error={error}
        input={
          <OutlinedInput id={`select-multiple-chip-${id}`} label={label} />
        }
        renderValue={multiple ? defaultRenderValue : undefined}
        endAdornment={
          onClear ? (
            <IconButton onClick={onClear} sx={{ mr: 2 }}>
              <ClearIcon />
            </IconButton>
          ) : undefined
        }
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;

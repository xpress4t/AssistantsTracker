import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";

const today = moment(Date.now());

const Datepicker = ({
  defaultValue = today,
  format = "DD/MM/YYYY",
  label,
  minDate,
  maxDate = today,
  onChange,
  onClear,
  clearable = false,
  value,
  size,
  sx,
}) => {
  return (
    <DatePicker
      label={label}
      format={format}
      maxDate={maxDate}
      onClear={onClear}
      onChange={onChange}
      defaultValue={defaultValue}
      sx={{ ...sx, width: "200px" }}
      value={value ? moment(value) : null}
      // Para borrar el valor de la fecha cuando se hace clic en el button limpiar
      minDate={minDate ? moment(minDate) : undefined}
      // Para agregar el icono de limpiar
      slotProps={{ field: { clearable, size } }}
    />
  );
};

export default Datepicker;

import Alert from "@mui/material/Alert";

const AttendanceValue = ({ value }) => {
  const alertType = value === true ? "success" : "error";
  return (
    <Alert
      variant="outlined"
      severity={alertType}
      sx={{ p: 1, width: "100px", "& > *": { p: "0 !important" } }}
    >
      {value === true ? "Presente" : "Ausente"}
    </Alert>
  );
};

export default AttendanceValue;

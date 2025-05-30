import Alert from "@mui/material/Alert";

const AttendanceValue = ({ value }) => {
  const alertType = value === true ? "success" : "error";
  return (
    <Alert variant="outlined" severity={alertType} sx={{ width: "100px" }}>
      {value === true ? "Presente" : "Ausente"}
    </Alert>
  );
};

export default AttendanceValue;

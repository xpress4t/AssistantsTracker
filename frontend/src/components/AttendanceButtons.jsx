// onAssistClick onAbsentsClick
import { ButtonGroup, Button } from "@mui/material";

const AttendanceButtons = ({ onAssistClick, onAbsentsClick, value }) => {
  return (
    <>
      <ButtonGroup>
        <Button
          variant={value === true ? "contained" : "outlined"}
          color="success"
          onClick={onAssistClick}
          disabled={value === "1"}
        >
          Presente
        </Button>
        <Button
          variant={value === false ? "contained" : "outlined"}
          color="error"
          onClick={onAbsentsClick}
          disabled={value === "0"}
        >
          Ausente
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AttendanceButtons;

// onAssistClick onAbsentsClick
import { ButtonGroup, Button } from "@mui/material";

const AttendanceButtons = ({ onAssistClick, onAbsentsClick, value }) => {
  return (
    <>
      <ButtonGroup>
        <Button
          variant={value ? "contained" : "outlined"}
          color="success"
          onClick={value !== true ? onAssistClick : undefined}
        >
          Presente
        </Button>
        <Button
          variant={value === false ? "contained" : "outlined"}
          color="error"
          onClick={value !== false ? onAbsentsClick : undefined}
        >
          Ausente
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AttendanceButtons;

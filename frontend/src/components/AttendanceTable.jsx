import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import AttendanceButtons from "./AttendanceButtons";

const AttendanceTable = ({
  history = [],
  onHistorySet,
  onHistoryUpdate,
  subjects,
  students,
  onEdit,
}) => (
  <TableContainer>
    <Table sx={{ minWidth: 650 }} aria-label="attendance table">
      <TableHead>
        <TableRow>
          <TableCell sx={{ maxWidth: "100px" }}>Fecha</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Asignatura</TableCell>
          <TableCell align="right">Asistencia</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {history.map((row) => {
          const student = students.find((s) => s.id === row.userId);
          const subject = subjects.find((s) => s.id === row.subjectId);

          const getHandler = () => {
            if (row.value !== undefined) {
              return onHistoryUpdate;
            }

            return onHistorySet;
          };

          const handleClick = getHandler();

          return (
            <TableRow key={row.attendanceId}>
              <TableCell sx={{ maxWidth: "100px" }}>{row.date}</TableCell>
              <TableCell>
                {student?.name} {student?.lastname}
              </TableCell>
              <TableCell>{subject?.name}</TableCell>
              <TableCell align="right">
                {/* <AttendanceValue value={row.value} /> */}
                <AttendanceButtons
                  onAbsentsClick={() => {
                    handleClick(row.userId, row.subjectId, false);
                  }}
                  onAssistClick={() => {
                    handleClick(row.userId, row.subjectId, true);
                  }}
                  value={row.value}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ m: 2 }}
                  onClick={() => onEdit(row)}
                >
                  Editar Asistencia
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AttendanceTable;

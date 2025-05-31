import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AttendanceButtons from "./AttendanceButtons";
import { formatDate } from "@/utils/dates";
import AttendanceValue from "./AttendanceValue";

const AttendanceTable = ({ history = [], onClick, subjects, students }) => (
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

          const onRowClick = (value) => {
            onClick(row, value);
          };

          return (
            <TableRow key={row.attendanceId}>
              <TableCell sx={{ maxWidth: "100px" }}>
                {formatDate(row.date)}
              </TableCell>
              <TableCell>
                {student?.name} {student?.lastname}
              </TableCell>
              <TableCell>{subject?.name}</TableCell>
              <TableCell align="right">
                {row.disableButtons ? (
                  <AttendanceValue value={row.value} />
                ) : (
                  <AttendanceButtons
                    onAbsentsClick={() => {
                      onRowClick(false);
                    }}
                    onAssistClick={() => {
                      onRowClick(true);
                    }}
                    value={row.value}
                  />
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AttendanceTable;

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const AttendanceTable = ({ history = [], subjects, students }) => (
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
          const student = students.find((s) => s.id === row.studentId);
          const subject = subjects.find((s) => s.id === row.subjectId);

          return (
            <TableRow
              key={row.id}
             
            >
              <TableCell sx={{ maxWidth: "100px" }}>{row.date}</TableCell>
              <TableCell>
                {student?.name} {student?.lastname}
              </TableCell>
              <TableCell>{subject?.name}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AttendanceTable;

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const CourseTable = ({ courses, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Aula</TableCell>
            <TableCell align="center">Número de Estudiantes</TableCell>
            <TableCell align="center">Número de Asignaturas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.studentIds.length}</TableCell>
              <TableCell align="center">{row.subjectIds.length}</TableCell>
              <TableCell align="right">
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button color="info" size="small" onClick={() => onEdit(row)}>
                    Edit
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => onDelete(row.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseTable;

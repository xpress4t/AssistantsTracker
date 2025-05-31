import Button from "../components/Button";
import Box from "@mui/material/Box";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const CourseTable = ({ courses, onEdit, onAssign, onDelete }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Aula</TableCell>
            <TableCell align="center">Número de Estudiantes</TableCell>
            <TableCell align="center">Número de Asignaturas</TableCell>
            <TableCell align="right">Acciones</TableCell>
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
              <TableCell align="center">{row.subjects.length}</TableCell>
              <TableCell align="right">
                <Box sx={{ gap: 1, display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    color="info"
                    size="medium"
                    onClick={() => onEdit(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    size="medium"
                    onClick={() => onAssign(row)}
                  >
                    Asignar profesor
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={() => onDelete(row.id)}
                  >
                    Delete
                  </Button>
                </Box>
                {/*listado de profe y listado de asignaturas */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseTable;

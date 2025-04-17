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

const UserTable = ({ users, roles, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Foto</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Rol</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.lastname}</TableCell>
              <TableCell align="center">{row.photo}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                {roles.find((role) => role.id === row.role)?.name}
              </TableCell>
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

export default UserTable;

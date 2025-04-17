import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../components/Button";
import Loading from "../components/Loading";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import UserModalDelete from "../components/UserModalDelete";
import api from "../services/index";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Open and close edit modal
  const handleOpenEdit = (u) => setUserToEdit(u);
  const handleCloseEdit = () => setUserToEdit(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = e.target.userId.value;
    const name = e.target.userName.value;
    const lastname = e.target.userLastname.value;
    const email = e.target.userEmail.value;
    const role = e.target.userRole.value;

    const updatedUser = {
      name,
      lastname,
      email,
      role: parseInt(role),
    };

    if (id) {
      await api.users.editUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.id === parseInt(id) ? { ...u, ...updatedUser } : u))
      );
    } else {
      await api.users.createUser(updatedUser);
      setUsers((prev) => {
        const lastItem = prev[prev.length - 1];
        return [...prev, { id: lastItem.id + 1, ...updatedUser }];
      });
    }
    handleCloseEdit();
    setLoading(false);
  };

  // Open and close Delete modal
  const handleOpenDelete = (id) => setUserToDelete(id);
  const handleCloseDelete = () => setUserToDelete(null);

  const handleDelete = async (id) => {
    setLoading(true);
    await api.users.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    handleCloseDelete();
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const u = await api.users.getUsers();
    setUsers(u);
    setLoading(false);
  };

  const fetchRoles = async () => {
    setLoading(true);
    const r = await api.tools.getRoles();
    setRoles(r);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3">Users</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleOpenEdit({ id: null, name: "" })}
        >
          Create
        </Button>
      </Box>
      <UserTable
        users={users}
        roles={roles}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Loading />
        </Box>
      )}
      <UserModal
        user={userToEdit}
        roles={roles}
        onClose={handleCloseEdit}
        onEdit={handleEdit}
      />
      <UserModalDelete
        user={userToDelete}
        onClose={handleCloseDelete}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default UsersPage;

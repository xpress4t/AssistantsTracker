import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Button from "../components/Button";
import Loading from "../components/Loading";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import UserModalDelete from "../components/UserModalDelete";
import AppBar from "../components/AppBar";
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
    const roleId = e.target.userRole.value;

    const updatedUser = {
      name,
      lastname,
      email,
      roleId,
      userId: id,
    };

    const users = id
      ? await api.users.editUser(updatedUser)
      : await api.users.createUser(updatedUser);
    setUsers(users);

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
    <Box>
      <Box>
        <AppBar title="Users" />
      </Box>
      <Box sx={{ p: 2 }}>
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
    </Box>
  );
};

export default UsersPage;

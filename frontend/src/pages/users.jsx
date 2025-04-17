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
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Open and close edit modal
  const handleOpenEdit = (user) => setUserToEdit(user);
  const handleCloseEdit = (user) => setUserToEdit(user);

  const handleEdit = async (e) => {

  }

  // Open and close delete modal
  const fetchUsers = async () => {
    setLoading(true);
    const user = await api.users.getUsers();
    setUsers(user);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3">Users</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => {}}
        >
          Create
        </Button>
      </Box>
      <UserTable users={users} />
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
      <UserModal user={userToEdit} />
      <UserModalDelete user={userToDelete} />
    </Box>
  );
};

export default UsersPage;

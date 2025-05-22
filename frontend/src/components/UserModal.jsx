import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "../components/Input";
import Select from "../components/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserModal = ({ user, roles, onClose, onEdit }) => {
  return (
    <Modal
      open={!!user} // es como un false x false
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={onEdit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {user?.id ? "Editar" : "Crear"} usuario
          </Typography>

          <Input
            defaultValue={user?.id}
            id={"userId"}
            name={"userName"}
            type="hidden"
            sx={{ display: "none" }}
          />

          <Input
            defaultValue={user?.name} // si existe user ponme name
            sx={{ mt: 4, minWidth: "100%" }}
            type="text"
            id="userName"
            name="userName"
            label="Nombres"
          />

          <Input
            defaultValue={user?.lastname}
            sx={{ mt: 4, minWidth: "100%" }}
            type="text"
            id="userLastname"
            name="userLastname"
            label="Apellidos"
          />

          <Input
            defaultValue={user?.email}
            sx={{ mt: 4, minWidth: "100%" }}
            type="email"
            id="userEmail"
            name="userEmail"
            label="Email"
          />
          <Box sx={{ mt: 4, minWidth: "100%" }}>
            <Select
              id="userRole"
              name="userRole"
              label="Rol"
              options={roles}
              defaultValue={user?.role || ""}
              multiple={false}
              getOptionLabel={(role) => role.name}
            />
          </Box>

          <Box
            aria-label="outlined primary button group"
            sx={{ mt: 4, display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              color="info"
              variant="contained"
              size="medium"
              type="submit"
            >
              Save
            </Button>
            <Button
              color="error"
              variant="contained"
              size="medium"
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;

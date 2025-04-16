import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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

const SubjectModalDelete = ({ subject, onClose, onDelete }) => {
  return (
    <Modal
      open={subject}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ¿Deseas eliminar esta asignatura?
        </Typography>

        <Box
          aria-label="outlined primary button group"
          sx={{ mt: 4, display: "flex", justifyContent: "space-evenly" }}
        >
          <Button
            color="error"
            variant="contained"
            size="medium"
            type="submit"
            onClick={() => onDelete(subject)}
          >
            Delete
          </Button>

          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubjectModalDelete;

import {
  Modal,
  TextField,
  MenuItem,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import Datepicker from "../components/Datepicker";
import Select from "../components/Select";
import api from "../services";
import { Today } from "@mui/icons-material";

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

const AttendanceModal = ({ attendance, onClose, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    userId: attendance?.userId || "",
    subjectId: attendance?.subjectId || "",
    date: attendance?.date || "",
    value: attendance?.value || true,
  });

  useEffect(() => {
    if (attendance) {
      setFormData({
        userId: attendance.userId || "",
        subjectId: attendance.subjectId || "",
        date: attendance.date || "",
        value: attendance.value ?? true,
      });
    }
  }, [attendance]);

  const fetchStudents = async () => {
    setLoading(true);
    const u = await api.users.getUsers(3);
    setStudents(u);
    setLoading(false);
  };

  const fetchSubjects = async () => {
    setLoading(true);
    const s = await api.subjects.getSubjects();
    setSubjects(s);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      open={!!attendance}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loading && <>CARGANDO</>}
        {!loading && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onEdit(formData);
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {attendance?.id ? "Editar" : "Crear"} asistencia
            </Typography>

            <Select
              id="student-select"
              name="userId"
              label="Estudiante"
              options={students}
              value={formData.userId}
              onChange={(e) => handleChange("userId", e.target.value)}
              getOptionLabel={(option) => `${option.name} ${option.lastname}`}
              defaultValue=""
              multiple={false}
            />

            <Select
              id="subject-select"
              name="subjectId"
              label="Asignatura"
              options={subjects}
              value={formData.subjectId}
              onChange={(e) => handleChange("subjectId", e.target.value)}
              getOptionLabel={(option) => option.name}
              defaultValue=""

              multiple={false}
            />

            <Datepicker
              label="Fecha"
              value={formData.date}
              onChange={(newValue) => {
                handleChange(
                  "date",
                  newValue ? newValue.format("YYYY-MM-DD") : ""
                );
              }}
             
              format="YYYY-MM-DD"
              clearable={true}
            />

            <Select
              id="attendance-select"
              name="value"
              label="Asistencia"
              options={[
                { id: true, name: "Presente" },
                { id: false, name: "Ausente" },
              ]}
              value={formData.value}
              onChange={(e) => handleChange("value", e.target.value)}
              getOptionLabel={(option) => option.name}
              defaultValue={true}
              width="100%"
              multiple={false}
            />

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
        )}
      </Box>
    </Modal>
  );
};

export default AttendanceModal;

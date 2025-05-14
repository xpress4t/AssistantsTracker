import { InputLabel, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "../components/Input";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useEffect, useState } from "react";
import api from "@/services";

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

const CourseModal = ({
  error,
  subjects,
  students,
  course,
  onClose,
  onEdit,
}) => {
  const subjectIds = course?.subjects.map((sub) => sub.subjectId) || [];

  const [loading, setLoading] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const freeStudents = students.filter((student) =>
    studentsList.includes(student.id)
  );

  const fetchStudents = async () => {
    setLoading(true);
    const students = await api.users.getFreeStudents();
    setStudentsList([...course?.studentIds, ...students]);
    setLoading(false);
  };

  useEffect(() => {
    if (!!course) {
      fetchStudents();
    }
  }, [course]);

  return (
    <Modal
      open={!!course}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loading && <> CARGANDO </>}

        {!loading && (
          <form onSubmit={onEdit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {course?.id ? "Editar" : "Crear"} aula
            </Typography>

            <Input
              defaultValue={course?.id}
              id={"courseId"}
              name={"courseId"}
              type="hidden"
              sx={{ display: "none" }}
            />

            <Input
              defaultValue={course?.name}
              sx={{ mt: 4, minWidth: "100%" }}
              type="text"
              id="courseName"
              name="courseName"
              label="Nombre"
              error={error?.field === "name" ? error : undefined}
            />

            <Box sx={{ mt: 4, minWidth: "100%" }}>
              <FormControl sx={{ width: 300 }}>
                <InputLabel>Estudiantes</InputLabel>
                <Select
                  id="courseStudentIds"
                  name="courseStudentIds"
                  multiple
                  defaultValue={course?.studentIds || []}
                  error={error?.field === "name" ? error : undefined}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Estudiantes"
                    />
                  }
                  renderValue={(selected) => {
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((id) => {
                          const student = students.find(
                            (user) => user.id === id
                          );
                          return (
                            <Chip
                              key={id}
                              label={`${student?.name} ${student?.lastname}`}
                            />
                          );
                        })}
                      </Box>
                    );
                  }}
                >
                  {freeStudents?.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name} {user.lastname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Asignaturas */}
            <Box sx={{ mt: 4, minWidth: "100%" }}>
              <FormControl sx={{ width: 300 }}>
                <InputLabel>Asignaturas</InputLabel>
                <Select
                  id="courseSubjectIds"
                  name="courseSubjectIds"
                  multiple
                  defaultValue={subjectIds || []}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Asignaturas"
                    />
                  }
                  renderValue={(selected) => {
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((id) => {
                          const subject = subjects.find((s) => s.id === id);
                          return <Chip key={id} label={`${subject?.name}`} />;
                        })}
                      </Box>
                    );
                  }}
                >
                  {subjects?.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
        )}
      </Box>
    </Modal>
  );
};

export default CourseModal;

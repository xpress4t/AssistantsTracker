import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import api from "@/services";
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
            
            {/* Estudiantes */}
            <Box sx={{ mt: 4, minWidth: "100%" }}>
              <Select
                id="courseStudentIds"
                name="courseStudentIds"
                label="Estudiantes"
                options={freeStudents}
                defaultValue={course?.studentIds}
                error={error?.field === "name" ? error : undefined}
                getOptionLabel={(user) => `${user.name} ${user.lastname}`}
                multiple
              />
            </Box>

            {/* Asignaturas */}
            <Box sx={{ mt: 4, minWidth: "100%" }}>
              <Select
                id="courseSubjectIds"
                name="courseSubjectIds"
                label="Asignaturas"
                options={subjects}
                defaultValue={subjectIds}
                getOptionLabel={(subject) => subject.name}
                multiple
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
        )}
      </Box>
    </Modal>
  );
};

export default CourseModal;

import { Box, Button } from "@mui/material";
import Select from "../components/Select";
import AppBar from "../components/AppBar";
import Datepicker from "../components/Datepicker";
import { useState, useEffect } from "react";
import AttendanceTable from "../components/AttendanceTable";
import api from "../services";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AttendanceModal from "../components/AttendanceModal";

const AttendancePage = () => {
  // Filtros
  const [subject, setSubject] = useState("");
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const [attendanceToEdit, setAttendanceToEdit] = useState(null);
  const handleCloseEdit = () => setAttendanceToEdit(null);

  const handleEdit = async (attendance) => {
    try {
      if (attendance.id) {
        await api.attendance.putAttendance(attendance);
      } else {
        await api.attendance.postAttendance(attendance);
      }
      fetchAttendance();
      handleCloseEdit();
    } catch (error) {
      console.error("Error al guardar la asistencia:", error);
    }
  };

  const handleEditClick = (attendance) => {
    setAttendanceToEdit(attendance);
  };

  // Datos
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  // 1. Función para obtener todos los cursos
  const fetchCourses = async () => {
    setLoading(true);
    const c = await api.courses.getCourses();
    setCourses(c);
    setLoading(false);
  };

  // 2. Función para obtener todos los estudiantes
  const fetchStudents = async () => {
    setLoading(true);
    const users = await api.users.getUsers(3);
    setStudents(users);
    setLoading(false);
  };

  // 3. Función para obtener todas las asignaturas
  const fetchSubjects = async () => {
    setLoading(true);
    const s = await api.subjects.getSubjects();
    setSubjects(s);
    setLoading(false);
  };

  // 4. Función para obtener los registros de asistencia (tener en cuenta los filtros)
  const fetchAttendance = async () => {
    setLoading(true);
    const h = await api.attendance.getAttendance({
      course,
      student,
      subject,
      dateFrom,
      dateTo,
    });
    setHistory(h);
    setLoading(false);
  };

  const clearData = () => {
    setCourse("");
    setSubject("");
    setStudent("");
    setDateFrom("");
    setDateTo("");
    setHistory([]);
  };

  const onHistorySet = async (userId, subjectId, value) => {
    console.log("Creating attendance record:", { userId, subjectId, value });
  };

  const onHistoryUpdate = async (userId, subjectId, value) => {
    console.log("Updating attendance record:", { userId, subjectId, value });
  };

  useEffect(() => {
    // 5. Obtener cursos estudiantes, asignaturas y asistencias
    fetchCourses();
    fetchStudents();
    fetchSubjects();
  }, []);

  // 6. useEffect escuchando los filtros para pedir el historial de asistencia filtrado
  // Aplicar debounce

  return (
    <>
      <AppBar title="Attendance" />
      <Box sx={{ m: 2 }}>
        <Select
          id="course"
          name="course"
          label="Course"
          options={courses}
          value={course}
          width="200px"
          onClear={() => {
            setCourse("");
          }}
          onChange={(e) => setCourse(e.target.value)}
          getOptionLabel={(opt) => opt.name}
        />
        <Select
          id="subject"
          name="subject"
          label="Subject"
          options={subjects}
          value={subject}
          width="200px"
          onClear={() => {
            setSubject("");
          }}
          onChange={(e) => setSubject(e.target.value)}
          getOptionLabel={(opt) => opt.name}
        />
        <Select
          id="students"
          name="students"
          label="Student"
          options={students.filter((u) => u.role === "3")}
          value={student}
          width="200px"
          onClear={() => {
            setStudent("");
          }}
          onChange={(e) => setStudent(e.target.value)}
          getOptionLabel={(opt) => opt.name}
        />

        <Datepicker
          defaultValue={null}
          label="Desde"
          value={dateFrom}
          onClear={() => {
            setDateFrom(null);
          }}
          onChange={(df) => {
            setDateFrom(df);
          }}
          clearable={true}
        />

        <Datepicker
          label="Hasta"
          value={dateTo}
          onClear={() => {
            setDateTo(null);
          }}
          onChange={(dt) => setDateTo(dt)}
          clearable={true}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchAttendance}
          sx={{ m: 2 }}
        >
          <SearchIcon />
          Buscar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={clearData}
          sx={{ m: 2 }}
        >
          <DeleteForeverIcon />
          Limpiar
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => setAttendanceToEdit({})}
          sx={{ m: 2 }}
        >
          Crear Asistencia
        </Button>
      </Box>

      <AttendanceTable
        history={history}
        onHistorySet={onHistorySet}
        onHistoryUpdate={onHistoryUpdate}
        subjects={subjects}
        students={students}
        onEdit={handleEditClick}
      />
      <AttendanceModal
        attendance={attendanceToEdit}
        onClose={handleCloseEdit}
        onEdit={handleEdit}
      />
    </>
  );
};

export default AttendancePage;

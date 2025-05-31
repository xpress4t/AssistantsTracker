import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Toolbar } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import Select from "../components/Select";
import AppBar from "../components/AppBar";
import Datepicker from "../components/Datepicker";
import { useState, useEffect } from "react";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceModal from "../components/AttendanceModal";
import api from "../services";

const AttendancePage = () => {
  // Filtros
  const [subject, setSubject] = useState("");
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState();

  // Datos
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const handleCloseEdit = () => setAttendanceModalOpen(false);

  // Función para obtener todos los cursos
  const fetchCourses = async () => {
    setLoading(true);
    const c = await api.courses.getCourses();
    setCourses(c);
    setLoading(false);
  };

  // Función para obtener todos los estudiantes
  const fetchStudents = async () => {
    setLoading(true);
    const users = await api.users.getUsers(3);
    setStudents(users);
    setLoading(false);
  };

  // Función para obtener todas las asignaturas
  const fetchSubjects = async () => {
    setLoading(true);
    const s = await api.subjects.getSubjects();
    setSubjects(s);
    setLoading(false);
  };

  // Función para obtener los registros de asistencia (tener en cuenta los filtros)
  const fetchAttendance = async (disableFilters = false) => {
    setLoading(true);
    const h = await api.attendance.getAttendance(
      disableFilters === true
        ? {}
        : {
            course,
            student,
            subject,
            dateFrom,
            dateTo,
          }
    );
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

  const onHistoryUpdate = async (attendanceId, value) => {
    setLoading(true);
    const attendance = { attendanceId, value };
    const filters = { course, student, subject, dateFrom, dateTo };
    const res = await api.attendance.putAttendance(attendance, filters);
    setHistory(res);
    setLoading(false);
  };

  const onAttendanceCreate = async (records) => {
    setHistory(records);
  };

  useEffect(() => {
    // Obtener cursos estudiantes, asignaturas y asistencias
    fetchCourses();
    fetchStudents();
    fetchSubjects();
    fetchAttendance();
  }, []);

  return (
    <>
      <AppBar title="Attendance" />
      <Toolbar
        sx={{
          alignItems: "flex-start",
          display: "flex",
          mt: 1,
          px: { xs: 0, sm: 0, md: 1, lg: 1, xl: 1 },
        }}
      >
        <Box sx={{ flex: 1, height: "100%" }}>
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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
          />

          <Datepicker
            label="Hasta"
            value={dateTo}
            onClear={() => {
              setDateTo(null);
            }}
            onChange={(dt) => setDateTo(dt)}
            clearable={true}
            size="small"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={fetchAttendance}
            sx={{ m: 1 }}
            startIcon={<SearchIcon />}
          >
            Buscar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={clearData}
            sx={{ m: 1 }}
            startIcon={<DeleteForeverIcon />}
          >
            Limpiar
          </Button>
        </Box>

        <Box sx={{ height: "100%" }}>
          <Button
            startIcon={<CalendarIcon />}
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => {
              clearData();
              fetchAttendance(true);

              setAttendanceModalOpen(true);
            }}
          >
            Create
          </Button>
        </Box>
      </Toolbar>

      <AttendanceTable
        history={history}
        subjects={subjects}
        students={students}
        onClick={(row, value) => onHistoryUpdate(row.attendanceId, value)}
      />

      <AttendanceModal
        onClose={handleCloseEdit}
        onCreate={onAttendanceCreate}
        subjects={subjects}
        students={students}
        courses={courses}
        open={attendanceModalOpen}
        existingHistory={history}
      />
    </>
  );
};

export default AttendancePage;

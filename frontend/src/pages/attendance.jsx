import { useState, useEffect } from "react";
import api from "@/services";
import { useGlobalState } from "@/context";
import AttendanceScreen from "@/components/AttendanceScreen";

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
  const { user } = useGlobalState();

  // Datos
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const handleCloseEdit = () => setAttendanceModalOpen(false);
  const handleOpenEdit = () => setAttendanceModalOpen(true);

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

    const studentFilter = user?.roleId === "3" ? user.userId : undefined;

    let filters = {};

    if (studentFilter) {
      filters = {
        ...filters,
        student: studentFilter,
      };
    }

    if (disableFilters !== true) {
      filters = {
        ...filters,
        course,
        student: studentFilter || student,
        subject,
        dateFrom: dateFrom ?? "",
        dateTo: dateTo ?? "",
      };
    }

    const h = await api.attendance.getAttendance(filters);
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

  const onHistoryUpdate = async (attendanceRecord, value) => {
    setLoading(true);
    const attendance = { attendanceId: attendanceRecord.attendanceId, value: value };
    const filters = { course, student, subject, dateFrom, dateTo };
    const res = await api.attendance.editAttendance(attendance, filters);
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
    <AttendanceScreen
      canCreate={user?.roleId === "2"}
      course={course}
      courses={courses}
      dateFrom={dateFrom}
      dateTo={dateTo}
      history={history}
      modalOpen={attendanceModalOpen}
      onClear={clearData}
      onHistoryUpdate={user?.roleId === "2" ? onHistoryUpdate : undefined}
      onModalOpen={handleOpenEdit}
      onModalClose={handleCloseEdit}
      onModalCreate={onAttendanceCreate}
      onSearch={fetchAttendance}
      setCourse={setCourse}
      setDateFrom={setDateFrom}
      setDateTo={setDateTo}
      setStudent={setStudent}
      setSubject={setSubject}
      subject={subject}
      subjects={subjects}
      student={student}
      students={students}
      user={user}
    />
  );
};

export default AttendancePage;

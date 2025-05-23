import { Box } from "@mui/material";
import Select from "../components/Select";
import AppBar from "../components/AppBar";
import Datepicker from '../components/Datepicker';
import { useState, useEffect } from "react";
import api from "../services/index";

const AttendancePage = () => {
  // Asignaturas
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  // Aulas
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  // Alumnos
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  const [date, setDate] = useState([null, null]);

  useEffect(() => {
    const fetch = async () => {
      const subjects = await api.subjects.getSubjects();
      setSubjects(subjects);
      const courses = await api.courses.getCourses();
      setCourses(courses);
      const users = await api.users.getUsers();
      setUsers(users);
    };
    fetch();
  }, []);

  return (

    <>
      <AppBar title="Attendance" />
      <Box sx={{ p: 2, gap: 2 }}>
        <Select
          id="course"
          name="course"
          label="Courses"
          options={courses}
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          getOptionLabel={(opt) => opt.name}
        />
        <Select
          id="subject"
          name="subject"
          label="Subjects"
          options={subjects}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          getOptionLabel={(opt) => opt.name}
        />
        <Select
          id="students"
          name="students"
          label="Students"
          options={users.filter((u) => u.role === "3")}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          getOptionLabel={(opt) => opt.name}
        />

        <Datepicker
          localText={{
            start: "Desde",
            end: "Hasta",
          }}
          value={date}
          onChange={(d) => setDate(d)}
        />
      </Box>
        </>

  );
};

export default AttendancePage;

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Loading from "../components/Loading";
import CourseTable from "../components/CourseTable";
import CourseModal from "../components/CourseModal";
import CourseModalDelete from "../components/CourseModalDelete";
import api from "../services/index";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpenEdit = (c) => setCourseToEdit(c);
  const handleCloseEdit = () => setCourseToEdit(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = e.target.courseId.value;
    const name = e.target.courseName.value;
    const studentIds = e.target.courseStudentIds?.value;
    const subjectIds = e.target.courseSubjectIds?.value;

    const updatedCourse = {
      name,
      studentIds: studentIds ? studentIds.split(",").map(Number) : [],
      subjectIds: subjectIds ? subjectIds.split(",").map(Number) : [],
    };

    if (id) {
      await api.courses.editCourse(updatedCourse);
      setCourses((prev) =>
        prev.map((c) =>
          c.id === parseInt(id) ? { ...c, ...updatedCourse } : c
        )
      );
    } else {
      await api.courses.createCourse(updatedCourse);
      setCourses((prev) => {
        const lastItem = prev[prev.length - 1];
        return [...prev, { id: lastItem.id + 1, ...updatedCourse }];
      });
    }
    handleCloseEdit();
    setLoading(false);
  };

  const handleOpenDelete = (id) => setCourseToDelete(id);
  const handleCloseDelete = () => setCourseToDelete(null);

  const handleDelete = async (id) => {
    setLoading(true);
    await api.courses.deleteCourse(id);
    setCourses((prev) => prev.filter((s) => s.id !== id));
    handleCloseDelete();
    setLoading(false);
  };

  const fetchCourses = async () => {
    setLoading(true);
    const c = await api.courses.getCourses();
    setCourses(c);
    setLoading(false);
  };

  const fetchStudents = async () => {
    setLoading(true);
    const users = await api.users.getUsers();
    setStudents(users.filter((user) => user.role === 2));
    setLoading(false);
  };

  const fetchSubjects = async () => {
    setLoading(true);
    const subjects = await api.subjects.getSubjects();
    setSubjects(subjects);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchSubjects();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3">Courses</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleOpenEdit({ id: null, name: "" })}
        >
          Create
        </Button>
      </Box>
      <CourseTable
        users={students}
        courses={courses}
        subjects={subjects}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />
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
      <CourseModal
        course={courseToEdit}
        students={students}
        subjects={subjects}
        onClose={handleCloseEdit}
        onEdit={handleEdit}
      />
      <CourseModalDelete
        course={courseToDelete}
        onClose={handleCloseDelete}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default CoursesPage;

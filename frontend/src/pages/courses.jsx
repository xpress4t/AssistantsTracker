import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Loading from "../components/Loading";
import CourseTable from "../components/CourseTable";
import CourseModal from "../components/CourseModal";
import CourseModalDelete from "../components/CourseModalDelete";
import CourseTeacherModal from "@/components/CourseTeacherModal";
import AppBar from "../components/AppBar";
import api from "../services";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [editError, setEditError] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseToAssign, setTeacherModalOpen] = useState(null);

  const handleOpenEdit = (c) => setCourseToEdit(c);
  const handleCloseEdit = () => setCourseToEdit(null);

  /* Edit courses */
  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = e.target.courseId.value;
    const name = e.target.courseName.value;
    const studentIds = e.target.courseStudentIds?.value;
    const subjectIds = e.target.courseSubjectIds?.value;

    const course = courses.find((c) => c.id === id);

    const updatedCourse = {
      id,
      name,
      studentIds: studentIds ? studentIds.split(",") : [],
      subjects: subjectIds
        ? subjectIds.split(",").map((value) => {
            const existingSubject = course?.subjects.find(
              (s) => s.subjectId === value
            );

            return {
              subjectId: value,
              teacherId: existingSubject?.teacherId,
            };
          })
        : [],
    };

    if (!!course) {
      const c = await api.courses.editCourse(updatedCourse);
      setCourses(c);
    } else {
      try {
        const c = await api.courses.createCourse(updatedCourse);
        setCourses(c);
      } catch (e) {
        setLoading(false);
        setEditError(e);
        return;
      }
    }
    handleCloseEdit();
    setLoading(false);
  };

  const handleOpenTeacherModal = (course) => setTeacherModalOpen(course);
  const handleCloseTeacherModal = () => setTeacherModalOpen(null);

  const handleSaveTeachers = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = e.target.courseId.value;
    const updatedSubjects = Array.from(e.target.elements)
      .filter((elem) => elem.tagName === "INPUT" && elem.id !== "courseId")
      .map((elem) => ({
        subjectId: elem.name.replace("teacher-", ""),
        teacherId: elem.value ? Number(elem.value) : null,
      }));

    const course = courses.find((c) => String(c.id) === String(id));
    if (!course) {
      setLoading(false);
      setEditError("No se encontró el curso.");
      return;
    }

    const updatedCourse = {
      id,
      name: course.name,
      studentIds: course.studentIds,
      subjects: updatedSubjects,
    };

    try {
      const c = await api.courses.editCourse(updatedCourse);
      setCourses(c);
    } catch (e) {
      setEditError(e);
    }
    handleCloseTeacherModal();
    setLoading(false);
  };

  /* Delete courses */
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
    const users = await api.users.getUsers(3);
    setStudents(users);
    setLoading(false);
  };

  const fetchSubjects = async () => {
    setLoading(true);
    const s = await api.subjects.getSubjects();
    setSubjects(s);
    setLoading(false);
  };

  const fetchTeachers = async () => {
    setLoading(true);
    const users = await api.users.getUsers(2);
    setTeachers(users);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchSubjects();
    fetchTeachers();
  }, []);

  return (
    <Box>
      <Box>
        <AppBar title="Courses" />
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={() =>
              handleOpenEdit({
                id: null,
                name: "",
                studentIds: [],
                subjects: [],
              })
            }
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
          onAssign={handleOpenTeacherModal}
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
          error={editError}
          students={students}
          subjects={subjects}
          onEdit={handleEdit}
          onClose={handleCloseEdit}
        />

        <CourseTeacherModal
          course={courseToAssign}
          teachers={teachers}
          subjects={subjects}
          onEdit={handleSaveTeachers}
          onClose={handleCloseTeacherModal}
        />

        <CourseModalDelete
          course={courseToDelete}
          onDelete={handleDelete}
          onClose={handleCloseDelete}
        />
      </Box>
    </Box>
  );
};

export default CoursesPage;

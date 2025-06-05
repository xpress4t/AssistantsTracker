import { useState, useEffect } from "react";
import { Dialog, Typography, Box, Button, IconButton } from "@mui/material";
import Select from "../components/Select";
import Datepicker from "../components/Datepicker";
import AttendanceTable from "../components/AttendanceTable";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import api from "@/services";
import { formatDate } from "@/utils/dates";

const AttendanceModal = ({
  courses,
  subjects,
  students,
  onClose,
  onCreate,
  open,
  existingHistory,
}) => {
  const [courseId, setCourseId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState(Date.now());

  const course = courses.find((c) => c.id === courseId);
  const subject = subjects.find((s) => s.id === subjectId);

  const courseSubjects = (course?.subjects ?? [])
    .map((sub) => subjects.find((s) => s.id === sub.subjectId))
    .filter((s) => !!s);

  let history = [];
  if (course && subject) {
    history = course.studentIds.map((studentId) => {
      const record = existingHistory.find(
        (r) =>
          r.userId === studentId &&
          r.subjectId === subject.id &&
          formatDate(r.date) === formatDate(date)
      );

      return {
        attendanceId: undefined,
        classroomId: course.id,
        userId: studentId,
        subjectId: subject.id,
        date: new Date(date).toDateString(),
        value: record?.value,
        disableButtons: !!record,
      };
    });
  }

  const onCourseSelect = (e) => {
    setCourseId(e.target.value);
    setSubjectId("");
  };

  const onClick = async (row, value) => {
    const attendance = { ...row, value };
    const history = await api.attendance.createAttendance(attendance, {});
    onCreate(history);
  };

  useEffect(() => {
    if (!open) {
      onCourseSelect({ target: { value: "" } });
    }
  }, [open]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        p: 2,
        "& > .MuiDialog-container > .MuiPaper-root": {
          display: "flex",
          height: "100%",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #e3f2fd 0%, #fff 60%, #f3e5f5 100%)",
          borderRadius: 4,
          boxShadow: "0 12px 40px 0 rgba(25, 118, 210, 0.18)",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          bgcolor: "#f5faff",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontWeight: 700, color: "#1976d2" }}
        >
          Crear Asistencia
        </Typography>

        <IconButton onClick={onClose} sx={{ color: "#1976d2" }}>
          <CancelRoundedIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          px: { xs: 2, md: 4 },
          py: 3,
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.05)",
          mb: 2,
        }}
      >
        <Select
          id="course"
          name="course"
          label="Course"
          options={courses}
          value={courseId}
          width="200px"
          onClear={() => {
            setCourseId("");
          }}
          onChange={onCourseSelect}
          getOptionLabel={(opt) => opt.name}
          size="small"
          sx={{ minWidth: 180 }}
        />

        <Select
          id="subject"
          name="subject"
          label="Subject"
          disabled={!courseId}
          options={courseSubjects}
          value={subjectId}
          width="200px"
          onClear={() => {
            setSubjectId("");
          }}
          onChange={(e) => setSubjectId(e.target.value)}
          getOptionLabel={(opt) => opt.name}
          size="small"
          sx={{ minWidth: 180 }}
        />

        <Datepicker
          defaultValue={null}
          label="Fecha"
          value={date}
          onClear={() => {
            setDate(null);
          }}
          onChange={(df) => {
            setDate(df);
          }}
          clearable={true}
          size="small"
          sx={{ minWidth: 180 }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          px: { xs: 1, md: 4 },
          pb: 4,
          overflow: "auto",
          bgcolor: "#f8fafc",
          borderRadius: 3,
          boxShadow: "0 1px 4px rgba(25, 118, 210, 0.04)",
        }}
      >
        <AttendanceTable
          courses={courses}
          history={history}
          onClick={onClick}
          students={students}
          subjects={subjects}
        />
      </Box>
    </Dialog>
  );
};

export default AttendanceModal;

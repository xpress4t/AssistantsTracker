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
    const history = await api.attendance.postAttendance(attendance, {});
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
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          m: 1,
          flexDirection: "row",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ flex: 1 }}
        >
          Crear Asistencia
        </Typography>

        <IconButton onClick={onClose}>
          <CancelRoundedIcon />
        </IconButton>
      </Box>

      <div>
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
          sx={{ m: 1 }}
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
          sx={{ m: 1 }}
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
          sx={{ m: 1 }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <AttendanceTable
          history={history}
          students={students}
          subjects={subjects}
          onClick={onClick}
        />
      </div>
    </Dialog>
  );
};

export default AttendanceModal;

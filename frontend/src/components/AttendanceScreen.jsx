import { Toolbar, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Select from "./Select";
import Datepicker from "./Datepicker";
import AttendanceTable from "./AttendanceTable";
import AppBar from "./AppBar";
import { CalendarIcon } from "@mui/x-date-pickers";
import AttendanceModal from "./AttendanceModal";

const AttendanceScreen = ({
  course,
  courses = [],
  dateFrom,
  dateTo,
  history,
  modalOpen,
  onClear,
  onHistoryUpdate,
  onModalClose,
  onModalCreate,
  onModalOpen,
  onSearch,
  setCourse,
  setDateFrom,
  setDateTo,
  setSubject,
  setStudent,
  subject,
  subjects = [],
  student,
  students = [],
}) => (
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
        {courses.length > 1 && (
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
            onChange={(e) => {
              setCourse(e.target.value);
            }}
            getOptionLabel={(opt) => opt.name}
            size="small"
            sx={{ m: 1 }}
          />
        )}

        {subjects.length > 1 && (
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
            sx={{ m: 1 }}
          />
        )}

        {students.length > 1 && (
          <Select
            id="students"
            name="students"
            label="Student"
            options={students}
            value={student}
            width="200px"
            onClear={() => {
              setStudent("");
            }}
            onChange={(e) => setStudent(e.target.value)}
            getOptionLabel={(opt) => `${opt.name} ${opt.lastname}`}
            size="small"
            sx={{ m: 1 }}
          />
        )}

        <Datepicker
          defaultValue={null}
          label="Desde"
          value={dateFrom}
          onClear={() => {
            setDateFrom("");
          }}
          onChange={(df) => {
            setDateFrom(df);
          }}
          clearable={true}
          size="small"
          sx={{ m: 1 }}
        />

        <Datepicker
          label="Hasta"
          value={dateTo}
          onClear={() => {
            setDateTo("");
          }}
          onChange={(dt) => setDateTo(dt)}
          clearable={true}
          size="small"
          sx={{ m: 1 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={onSearch}
          sx={{ m: 1 }}
          startIcon={<SearchIcon />}
        >
          Buscar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onClear}
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
            onClear();
            onSearch(true);
            onModalOpen();
          }}
        >
          Create
        </Button>
      </Box>
    </Toolbar>

    <AttendanceTable
      history={history}
      students={students || [user]}
      subjects={subjects}
      courses={courses}
      onClick={onHistoryUpdate}
    />

    <AttendanceModal
      onOpen={onModalOpen}
      onClose={onModalClose}
      onCreate={onModalCreate}
      subjects={subjects}
      students={students}
      courses={courses}
      open={modalOpen}
      existingHistory={history}
    />
  </>
);

export default AttendanceScreen;

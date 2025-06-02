import { Toolbar, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Select from "./Select";
import Datepicker from "./Datepicker";
import AttendanceTable from "./AttendanceTable";
import AppBar from "./AppBar";

const AttendanceScreen = ({
  course,
  courses = [],
  dateFrom,
  dateTo,
  history,
  onClear,
  onSearch,
  setCourse,
  setDateFrom,
  setDateTo,
  setStudent,
  setSubject,
  student,
  students = [],
  subject,
  subjects = [],
}) => {
  // Mostrar filtros de asignatura y fechas
  // Mostrar la tabla de registros con los botones deshabilidatos
  return (
    <>
      <AppBar title="Attendance" />

      <Toolbar>
        {!!courses && (
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
            sx={{ m: 1 }}
          />
        )}

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

        {!!students && (
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
      </Toolbar>

      <AttendanceTable
        history={history}
        students={students || [user]}
        subjects={subjects}
        courses={courses}
      />
    </>
  );
};

export default AttendanceScreen;

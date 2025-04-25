import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Input from "../components/Input";
import Grid from "@mui/material/Grid2";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CourseTeacherModal = ({
  course,
  teachers,
  subjects,
  onEdit,
  onClose,
}) => {
  return (
    <Modal
      open={!!course}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={onEdit}>
          <Input
            defaultValue={course?.id}
            id={"courseId"}
            name={"courseId"}
            type="hidden"
            sx={{ display: "none" }}
          />

          <Grid container spacing={2}>
            {course?.subjects.map((courseSubject) => {
              const subject = subjects.find(
                (s) => s.id === courseSubject.subjectId
              );
              const labelId = `subject-${courseSubject.subjectId}-teacher`;

              return (
                <React.Fragment key={subject.name}>
                  <Grid
                    size={{ xs: 12, sm: 6 }}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <InputLabel sx={{ color: "black" }}>
                      {subject?.name}
                    </InputLabel>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel id={labelId}>Profesor</InputLabel>
                      <Select
                        defaultValue={courseSubject.teacherId || ""}
                        inputProps={{ id: courseSubject.subjectId }}
                        labelId={labelId}
                        name={labelId}
                        label="Profesor"
                      >
                        {teachers.map((teacher) => {
                          return (
                            <MenuItem key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>

          <Box
            aria-label="outlined primary button group"
            sx={{ mt: 4, display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              color="info"
              variant="contained"
              size="medium"
              type="submit"
            >
              Save
            </Button>
            <Button
              color="error"
              variant="contained"
              size="medium"
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CourseTeacherModal;

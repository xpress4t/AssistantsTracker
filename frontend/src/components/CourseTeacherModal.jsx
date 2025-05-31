import { Modal, Box, Button, InputLabel } from "@mui/material";
import Input from "../components/Input";
import Grid from "@mui/material/Grid2";
import Select from "../components/Select";
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

              if (!subject) {
                return <p>Subject {courseSubject.subjectId} does not exist</p>;
              }

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
                    <Select
                      id={`teacher-select-${courseSubject.subjectId}`}
                      name={`teacher-${courseSubject.subjectId}`}
                      label="Profesor"
                      options={teachers}
                      defaultValue={courseSubject.teacherId || ""}
                      multiple={false}
                      getOptionLabel={(teacher) => teacher.name}
                    />
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

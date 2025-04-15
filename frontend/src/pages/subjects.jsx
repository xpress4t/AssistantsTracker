import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../components/Button";
import SubjectTable from "../components/SubjectTable";
import SubjectModal from "../components/SubjectModal";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState(null);

  const handleOpen = (s) => setSubject(s);
  const handleClose = () => setSubject(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.subjectId.value;
    const name = e.target.subjectName.value;

    if (id) {
      setSubjects((prev) =>
        prev.map((s) => (s.id === parseInt(id) ? { ...s, name } : s))
      );
    } else {
      setSubjects((prev) => {
        const lastItem = prev[prev.length - 1];
        return [...prev, { id: lastItem.id + 1, name }];
      });
    }
    handleClose();
  };

  useEffect(() => {
    setSubjects([
      { id: 1, name: "Matemáticas" },
      { id: 2, name: "Física" },
    ]);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3">Subjects</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleOpen({ id: null, name: "" })}
        >
          Create
        </Button>
      </Box>
      <SubjectTable subjects={subjects} onEdit={handleOpen} />
      <SubjectModal
        subject={subject}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default SubjectsPage;

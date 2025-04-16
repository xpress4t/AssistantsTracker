import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../components/Button";
import SubjectTable from "../components/SubjectTable";
import SubjectModal from "../components/SubjectModal";
import SubjectModalDelete from "../components/SubjectModalDelete";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const handleOpenEdit = (s) => setSubjectToEdit(s);
  const handleCloseEdit = () => setSubjectToEdit(null);

  const handleEdit = (e) => {
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
    handleCloseEdit();
  };

  const handleOpenDelete = (id) => setSubjectToDelete(id);
  const handleCloseDelete = () => setSubjectToDelete(null);

  const handleDelete = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    handleCloseDelete();
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
          onClick={() => handleOpenEdit({ id: null, name: "" })}
        >
          Create
        </Button>
      </Box>
      <SubjectTable
        subjects={subjects}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />
      <SubjectModal
        subject={subjectToEdit}
        onClose={handleCloseEdit}
        onEdit={handleEdit}
      />
      <SubjectModalDelete
        subject={subjectToDelete}
        onClose={handleCloseDelete}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default SubjectsPage;

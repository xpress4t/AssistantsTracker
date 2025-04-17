import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../components/Button";
import Loading from "../components/Loading";
import SubjectTable from "../components/SubjectTable";
import SubjectModal from "../components/SubjectModal";
import SubjectModalDelete from "../components/SubjectModalDelete";
import api from "../services/index";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Open and close Edit modal
  const handleOpenEdit = (s) => setSubjectToEdit(s);
  const handleCloseEdit = () => setSubjectToEdit(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = e.target.subjectId.value;
    const name = e.target.subjectName.value;

    if (id) {
      await api.subjects.editSubject({ name });
      setSubjects((prev) =>
        prev.map((s) => (s.id === parseInt(id) ? { ...s, name } : s))
      );
    } else {
      await api.subjects.createSubject({ name });
      setSubjects((prev) => {
        const lastItem = prev[prev.length - 1];
        return [...prev, { id: lastItem.id + 1, name }];
      });
    }
    handleCloseEdit();
    setLoading(false);
  };

  // Open and close Delete modal
  const handleOpenDelete = (id) => setSubjectToDelete(id);
  const handleCloseDelete = () => setSubjectToDelete(null);

  const handleDelete = async (id) => {
    setLoading(true);
    await api.subjects.deleteSubject(id);
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    handleCloseDelete();
    setLoading(false);
  };

  // Fetch subjects from "api"
  const fetchSubjects = async () => {
    setLoading(true);
    const s = await api.subjects.getSubjects();
    setSubjects(s);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubjects();
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

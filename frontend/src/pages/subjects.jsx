import { useEffect, useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import Button from "../components/Button";
import Loading from "../components/Loading";
import SubjectTable from "../components/SubjectTable";
import SubjectModal from "../components/SubjectModal";
import SubjectModalDelete from "../components/SubjectModalDelete";
import AppBar from "../components/AppBar";
import IconButton from "../components/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import api from "../services/index";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpenEdit = (s) => setSubjectToEdit(s);
  const handleCloseEdit = () => setSubjectToEdit(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = e.target.subjectId.value;
    const name = e.target.subjectName.value;

    const subjects = id
      ? await api.subjects.editSubject(id, name)
      : await api.subjects.createSubject({ name });
    setSubjects(subjects);

    handleCloseEdit();
    setLoading(false);
  };

  const handleOpenDelete = (id) => setSubjectToDelete(id);
  const handleCloseDelete = () => setSubjectToDelete(null);

  const handleDelete = async (id) => {
    setLoading(true);
    const newSubjects = await api.subjects.deleteSubject(id);
    setSubjects(newSubjects);
    handleCloseDelete();
    setLoading(false);
  };

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
      <AppBar>
        <Toolbar>
          <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" color="inherit" sx={{ fontSize: "24px" }}>
            Subjects
          </Typography>

          <Box sx={{ marginLeft: "auto", display: "flex", gap: 2 }}>
            <Button
              size="large"
              color="inherit"
              href="../courses"
              variant="outlined"
            >
              Courses
            </Button>
            <Button
              size="large"
              color="inherit"
              href="../subjects"
              variant="outlined"
            >
              Subjects
            </Button>
            <Button
              size="large"
              color="inherit"
              href="../users"
              variant="outlined"
            >
              Users
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
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

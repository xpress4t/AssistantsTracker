import React, { useEffect, useState } from "react";
import List from "../components/List";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Avatar,
  Checkbox,
} from "@mui/material";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // cambiar endpoint al final por users
        const response = await fetch("http://localhost/backend/users/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {students.map((student) => {
        const labelId = `checkbox-list-secondary-label-${student.id}`;
        return (
          <ListItem
            key={student.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(student.id)}
                checked={checked.includes(student.id)}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={student.name} src={student.photo}>
                  {student.name[0] + student.lastname[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={student.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default StudentManagement;

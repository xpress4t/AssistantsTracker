import { API_URL, attendance } from "./constants";

export const getAttendance = async (filters) => {
  console.log("Fetching attendance with filters:", filters);

  return [
    {
      id: "attendance1",
      studentId: "2",
      subjectId: "2",
      date: "22/05/2025",
      status: "absent",
    },
    {
      id: "attendance2",
      studentId: "3",
      subjectId: "1",
      date: "22/05/2025",
      status: "present",
    },
    {
      id: "attendance3",
      studentId: "6",
      subjectId: "3",
      date: "23/05/2025",
      status: "excused",
    },
    {
      id: "attendance4",
      studentId: "17",
      subjectId: "4",
      date: "24/05/2025",
      status: "present",
    },
  ];

  const params = new URLSearchParams(filters);
  let url = `${API_URL}${attendance}`;

  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

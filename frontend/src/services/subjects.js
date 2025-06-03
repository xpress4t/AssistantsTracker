import { API_URL, subjects } from "./constants";

export const getSubjects = async () => {
  const url = `${API_URL}${subjects}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  
  const data = await res.json();
  return data;
};

export const createSubject = async (subject) => {
  const url = `${API_URL}${subjects}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ subject }),
  });

  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();
  return data;
};

export const editSubject = async (subjectId, subjectName) => {
  const url = `${API_URL}${subjects}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ subjectId, subjectName }),
  });

  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();
  return data;
};

export const deleteSubject = async (subjectId) => {
  const url = `${API_URL}${subjects}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ subjectId }),
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

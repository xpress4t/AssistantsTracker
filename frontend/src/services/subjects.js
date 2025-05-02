import { API_URL, subjects } from "./constants";

export const getSubjects = async () => {
  const url = `${API_URL}${subjects}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const createSubject = async (subject) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(subject);
    }, 200);
  });
};

export const editSubject = async (subject) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(subject);
    }, 200);
  });
};

export const deleteSubject = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};

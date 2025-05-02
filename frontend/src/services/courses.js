import { API_URL, courses } from "./constants";

export const getCourses = async () => {
  const url = `${API_URL}${courses}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const createCourse = async (course) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(course);
    }, 200);
  });
};

export const editCourse = async (course) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(course);
    }, 200);
  });
};

export const deleteCourse = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};

import { API_URL, courses } from "./constants";

export const getCourses = async () => {
  const url = `${API_URL}${courses}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  });
  if (!res.ok) {
    // Se lanza un error con el contenido de la respuesta
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

export const createCourse = async (course) => {
  const url = `${API_URL}${courses}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(course),
  });

  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();
  return data;
};

export const editCourse = async (course) => {
  const url = `${API_URL}${courses}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(course),
  });
  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();
  return data;
};

export const deleteCourse = async (id) => {
  const url = `${API_URL}${courses}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();
  return data;
};

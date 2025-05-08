import { API_URL, courses } from "./constants";

export const getCourses = async () => {
  const url = `${API_URL}${courses}`;
  const res = await fetch(url, {
    // No es necesario escribir "method: "GET", ya que
    // es el método por defecto :)
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    // Se lanza un error con el contenido de la respuesta
    // Este error permite 
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
    body: JSON.stringify(course),
  });

  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();
  return data;
};

export const editCourse = async (course) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(course);
    }, 200);
  });
};

export const deleteCourse = async (id) => {
  const url = `${API_URL}${courses}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

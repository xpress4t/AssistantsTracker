export const getSubjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Matemáticas" },
        { id: 2, name: "Física" },
        { id: 3, name: "Quimica" },
        { id: 4, name: "Educacion Fisica" },
        { id: 5, name: "Inglés" },
        { id: 6, name: "FOL" },
        { id: 7, name: "Marcas" },
        { id: 8, name: "Lengua" },
      ]);
    }, 200);
  });
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

export const getSubjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Matemáticas" },
        { id: 2, name: "Física" },
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

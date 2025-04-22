export const getRoles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Administrador",
        },
        {
          id: 2,
          name: "Profesor",
        },
        {
          id: 3,
          name: "Alumno",
        },
      ]);
    }, 200);
  });
};

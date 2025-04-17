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
          name: "Alumno",
        },
        {
          id: 3,
          name: "Profesor",
        },
      ]);
    }, 200);
  });
};

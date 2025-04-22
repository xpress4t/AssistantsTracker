export const getUsers = async (roleId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          {
            id: 1,
            name: "John",
            lastname: "Doe",
            photo: "",
            email: "john@gmail.com",
            role: 1,
          },
          {
            id: 2,
            name: "Jane",
            lastname: "Smith",
            photo: "",
            email: "jane@gmail.com",
            role: 2,
          },
          {
            id: 3,
            name: "Pepe",
            lastname: "Smith",
            photo: "",
            email: "Pepe@gmail.com",
            role: 2,
          },
          {
            id: 4,
            name: "Gregory",
            lastname: "Smith",
            photo: "",
            email: "Gregory@gmail.com",
            role: 3,
          },
          {
            id: 5,
            name: "Pablo",
            lastname: "Escobar",
            photo: "",
            email: "pablo@gmail.com",
            role: 3,
          },
        ].filter((u) => !roleId || u.role === roleId)
      );
    }, 200);
  });
};

export const createUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 200);
  });
};

export const editUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 200);
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};

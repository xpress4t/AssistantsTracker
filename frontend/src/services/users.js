export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 200);
  });
};

export const createUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 1000);
  });
};

export const editUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 1000);
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

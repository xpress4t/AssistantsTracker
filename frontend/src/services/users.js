import { API_URL, users } from "./constants";

export const getUsers = async (roleId) => {
  const url = `${API_URL}${users}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return data;
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

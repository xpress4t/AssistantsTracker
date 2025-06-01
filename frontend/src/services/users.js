import { API_URL, users } from "./constants";

export const getUsers = async (roleId) => {
  let url = `${API_URL}${users}`;
  if (roleId) {
    url += `?roleId=${roleId}`;
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

export const editUser = async (user) => {
  const url = `${API_URL}${users}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify({ user }),
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

export const deleteUser = async (id) => {
  const url = `${API_URL}${users}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify({ userId: id }),
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

export const getFreeStudents = async () => {
  const url = `${API_URL}${users}/?freeStudents`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

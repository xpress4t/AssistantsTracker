import { API_URL, auth } from "./constants";

export const getAuthenticatedUser = async () => {
  const url = `${API_URL}${auth}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

export const login = async (email, password) => {
  const url = `${API_URL}${auth}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

export const register = async (user) => {
  const url = `${API_URL}${auth}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

export const logout = async () => {
  const url = `${API_URL}${auth}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

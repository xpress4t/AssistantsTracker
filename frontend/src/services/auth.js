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

export const uploadPhoto = async (file) => {
  const url = `${API_URL}users/uploadPhoto.php`;

  const formData = new FormData();
  formData.append("photo", file);
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error al subir la foto");
  }
  const data = await res.json();
  return data.url;
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

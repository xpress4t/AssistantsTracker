import { API_URL, attendances } from "./constants";

export const getAttendance = async (filters) => {
  const params = new URLSearchParams(filters);
  let url = `${API_URL}${attendances}`;

  if (params.toString()) {
    url += `?${params.toString()}`;
  }
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

export const createAttendance = async (attendance, filters) => {
  const url = `${API_URL}${attendances}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ attendance, filters }),
  });

  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  return data;
};

export const editAttendance = async (attendance, filters) => {
  const url = `${API_URL}${attendances}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ attendance, filters }),
  });

  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();
  return data;
};

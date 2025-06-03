import { API_URL, roles } from "./constants";

export const getRoles = async () => {
  const url = `${API_URL}${roles}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  return data;
};

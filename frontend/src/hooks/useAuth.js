import { useGlobalState } from "@/context";
import api from "@/services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const isPublicRoute = (path) => {
  switch (path) {
    case "/":
    case "/register":
    case "/register/success":
      return true;

    default:
      return false;
  }
};

export const useAuth = () => {
  const { pathname, push } = useRouter();
  const { user, setUser } = useGlobalState();
  const [status, setStatus] = useState("idle");

  const fetchUser = async () => {
    setStatus("loading");
    const user = await api.auth.getAuthenticatedUser();
    if (user) {
      setUser(user);
    }

    setStatus("success");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (status === "error") {
      if (!isPublicRoute(pathname)) {
        push("/");
      }
    }

    if (status === "success") {
      if (!!user && isPublicRoute(pathname)) {
        push("/dashboard");
      } else if (!user && !isPublicRoute(pathname)) {
        push("/");
      }
    }
  }, [status, user]);

  return {
    status,
  };
};

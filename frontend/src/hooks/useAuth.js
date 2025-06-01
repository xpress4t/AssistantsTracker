import { useGlobalState } from "@/context";
import api from "@/services";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();
  const { setUser } = useGlobalState();

  const fetchUser = async () => {
    const user = await api.auth.getAuthenticatedUser();
    if (user) {
      setUser(user);
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
};

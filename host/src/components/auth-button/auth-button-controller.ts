import { signOut } from "@/services/auth";
import { getUser } from "@/services/user";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";

export const useHandleSignOut = () => {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await signOut();
      router.navigate({ to: "/login" });
    } catch (error) {
      console.error("Error user sign out: ", error);
    }
  };

  return handleSubmit;
};

export const useHandleUser = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((error) => console.error("Error getting user: ", error));
  }, []);

  return user;
};

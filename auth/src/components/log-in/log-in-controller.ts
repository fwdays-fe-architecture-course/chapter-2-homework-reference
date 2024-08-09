import { logIn } from "@/services/auth";
import { AuthData } from "@/services/auth/types";
import { NavigationContext } from "@/services/navigation/context";
import { useContext } from "react";

export const useHandleSubmit = () => {
  const onNavigateContext = useContext(NavigationContext);

  const handleSubmit = async (data: AuthData) => {
    try {
      await logIn(data);
      if (onNavigateContext?.navigate) {
        onNavigateContext?.navigate({ to: "/editor" });
      }
    } catch (error) {
      console.error("Error user sign in: ", error);
      // TODO: use code with correct router
      // navigate({
      //     to: '/log-in',
      //     search: { message: 'Could not authenticate user' },
      // });

      if (onNavigateContext?.navigate) {
        onNavigateContext?.navigate({
          to: "/log-in?message=Could not authenticate user",
        });
      }
    }
  };

  return handleSubmit;
};

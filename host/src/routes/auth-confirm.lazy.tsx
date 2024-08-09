import { authConfirm } from "@/services/auth";
import { EmailOtpType } from "@supabase/supabase-js";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createLazyFileRoute("/auth-confirm")({
  component: AuthConfirmPage,
});

function AuthConfirmPage() {
  const router = useRouter();
  const navigate = router.navigate;
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      const searchParams = new URLSearchParams(location.search);
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type") as EmailOtpType;

      if (!token_hash || !type) {
        console.error("Missed required params");
        navigate({ to: "/error" });
        return;
      }

      authConfirm({ token_hash, type })
        .then(() => navigate({ to: "/" }))
        .catch((error) => {
          console.error("Error confirm user login: ", error);
          navigate({ to: "/error" });
        });
    }
  }, [navigate]);

  return null;
}

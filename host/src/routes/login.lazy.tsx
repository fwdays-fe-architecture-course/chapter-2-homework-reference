import { createLazyFileRoute } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import TaskAuth from "auth/Auth";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const router = useRouter();

  return <TaskAuth onNavigate={router.navigate} />;
}

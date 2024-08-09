import { Header } from "@/components/header/header";
import {
  createLazyFileRoute,
  useRouter,
} from "@tanstack/react-router";
import TaskList from "taskList/TaskList";

export const Route = createLazyFileRoute("/tasks")({
  component: TasksPage,
});

export default function TasksPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <TaskList onNavigate={router.navigate} />
    </>
  );
}

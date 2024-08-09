import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "@/components/data-table/Columns";
import { taskSchema } from "@/data/schema";
import { Task } from "@/data/schema";
import { TasksContext } from "@/context/tasksContext";
import { NavigationContext } from "@/context/navigationContext";

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const onNavigateContext = useContext(NavigationContext);

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setIsLoading(true);
        setError(null);
        try {
          const tasksArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const todos = tasksArray.map((item: any) => ({
            id: item.id,
            todo: item.todo,
            status: item.completed ? "done" : "todo",
            priority: item.priority || "medium",
            name: item.name,
          }));

          const parsedTasks = z.array(taskSchema).parse(todos);
          setTasks(parsedTasks);
        } catch (e) {
          setError(
            e instanceof Error ? e.message : "An unknown error occurred"
          );
          console.error("Error fetching tasks:", e);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Firestore error:", error);
        setError("Failed to fetch tasks. Please try again later.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCreateNewTask = () => {
    if (onNavigateContext?.navigate) {
      onNavigateContext?.navigate({ to: "/editor" });
    }
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <p className="text-muted-foreground">List of your tasks:</p>
        </div>
        <button
          onClick={handleCreateNewTask}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create New Task
        </button>
      </div>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <DataTable data={tasks} columns={columns} />
      </TasksContext.Provider>
    </div>
  );
}

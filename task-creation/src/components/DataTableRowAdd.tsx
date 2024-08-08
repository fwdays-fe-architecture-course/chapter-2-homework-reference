import {useState} from "react";
import {collection, addDoc} from "firebase/firestore";
import {db} from "@/firebaseConfig";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export function DataTableRowAdd() {
    const [newTask, setNewTask] = useState("");
    const [newTaskName, setNewTaskName] = useState("");
    const [error, setError] = useState("");

    const handleAddTask = async () => {
        if (!newTaskName.trim() || !newTask.trim()) {
            setError("Both fields are required");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                name: newTaskName,
                todo: newTask,
                status: "todo",
                priority: "medium",
            });
            setNewTask("");
            setNewTaskName("");
            setError("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="h-full flex flex-col space-y-2 p-2 md:flex w-1/2 justify-center items-center mr-auto ml-auto">
            <Input
                placeholder="Name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
            />
            <Input
                placeholder="New task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={handleAddTask}>Add Task</Button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
}
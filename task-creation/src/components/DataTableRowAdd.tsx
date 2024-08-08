import {useState} from "react";
import {collection, addDoc} from "firebase/firestore";
import {db} from "@/firebaseConfig"; // Adjust the import path as needed

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
            console.log("Document written with ID: ", docRef.id);
            setNewTask("");
            setNewTaskName("");
            setError("");
            // You might want to refresh the tasks list here or use a Firebase listener
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="h-full flex-1 flex-col space-y-2 p-2 md:flex">
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
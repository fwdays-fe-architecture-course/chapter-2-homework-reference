import {useEffect, useState} from "react";
import {z} from "zod";
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, onSnapshot, query} from 'firebase/firestore';
import {firebaseConfig} from "@/firebase";
import {taskSchema} from "@/data/schema";
import {Task} from "@/data/schema";
import * as React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'tasks'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setIsLoading(true);
            setError(null);
            try {
                const tasksArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
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
                setError(e instanceof Error ? e.message : 'An unknown error occurred');
                console.error("Error fetching tasks:", e);
            } finally {
                setIsLoading(false);
            }
        }, (error) => {
            console.error("Firestore error:", error);
            setError("Failed to fetch tasks. Please try again later.");
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="preview flex w-full justify-center p-10 items-center">
            <Tabs defaultValue="account" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="add-task">Add New Task</TabsTrigger>
                    <TabsTrigger value="tasks-list">Tasks List</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="add-task">Add New Task</TabsContent>
                <TabsContent value="tasks-list">Tasks List</TabsContent>
            </Tabs>
        </div>
    );
}
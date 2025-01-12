import { Injectable } from '@angular/core';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private firebaseService: FirebaseService) {
    this.initializeTaskListener();
  }

  private initializeTaskListener() {
    const db = this.firebaseService.firestore;
    const q = collection(db, 'tasks');

    onSnapshot(q, (querySnapshot) => {
      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));
      this.tasksSubject.next(tasks);
    });
  }

  async addTask(task: Omit<Task, 'id'>) {
    const db = this.firebaseService.firestore;

    try {
      await addDoc(collection(db, 'tasks'), task);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>) {
    const db = this.firebaseService.firestore;

    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, updates);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(taskId: string) {
    const db = this.firebaseService.firestore;

    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { DataTableComponent } from '../data-table/data-table.component';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, DataTableComponent, EditTaskFormComponent],
  template: `
    <div class="min-h-screen bg-gray-50/30">
      <div class="p-8 space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-lg text-gray-700">List of your tasks:</h2>
          <button
            (click)="createNewTask()"
            class="px-6 py-2.5 text-base font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-2">
            Create New Task
          </button>
        </div>

        <ng-container *ngIf="!editingTask; else editForm">
          <app-data-table
            [data]="tasks$ | async"
            [columns]="columns"
            (onEdit)="startEditing($event)"
            (onDelete)="deleteTask($event)"
            (onSort)="sortBy($event)">
          </app-data-table>
        </ng-container>

        <ng-template #editForm>
          <app-edit-task-form
            [task]="editingTask"
            (onSave)="saveTask($event)"
            (onCancel)="cancelEditing()">
          </app-edit-task-form>
        </ng-template>
      </div>
    </div>
  `
})
export class TaskTableComponent {
  tasks$: Observable<Task[]>;
  editingTask: Task | null = null;
  sortConfig = {
    column: '',
    direction: 'asc' as 'asc' | 'desc'
  };

  columns = [
    { prop: 'name', name: 'Name', sortable: true },
    { prop: 'todo', name: 'Todo', sortable: true },
    { prop: 'status', name: 'Status', sortable: true },
    { prop: 'actions', name: 'Actions' }
  ];

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$.pipe(
      map(tasks => this.sortTasks(tasks))
    );
  }

  sortBy(sortEvent: {column: string, direction: 'asc' | 'desc'}) {
    this.sortConfig = sortEvent;
    this.tasks$ = this.taskService.tasks$.pipe(
      map(tasks => this.sortTasks(tasks))
    );
  }

  createNewTask() {
    this.taskService.addTask({
      name: 'New Task',
      todo: 'Something to do',
      status: 'Pending',
      priority: '4'
    }).catch(e => {
      console.error('Error adding task from table:', e);
    });
  }

  startEditing(task: Task) {
    this.editingTask = task;
  }

  cancelEditing() {
    this.editingTask = null;
  }

  async saveTask(updatedTask: Task) {
    if (updatedTask.id) {
      await this.taskService.updateTask(updatedTask.id, updatedTask);
    }
    this.editingTask = null;
  }

  async deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      await this.taskService.deleteTask(task.id);
    }
  }

  private sortTasks(tasks: Task[]): Task[] {
    if (!this.sortConfig.column) return tasks;

    return [...tasks].sort((a, b) => {
      const aVal = String(a[this.sortConfig.column as keyof Task]).toLowerCase();
      const bVal = String(b[this.sortConfig.column as keyof Task]).toLowerCase();

      if (this.sortConfig.direction === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }
}

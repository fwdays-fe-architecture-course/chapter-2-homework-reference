import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="space-y-1">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            formControlName="name"
            class="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Task name"
          />
        </div>
        <div class="space-y-1">
          <label for="todo" class="block text-sm font-medium text-gray-700">Todo</label>
          <input
            id="todo"
            formControlName="todo"
            class="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Task description"
          />
        </div>
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            (click)="onCancel.emit()"
            class="px-6 py-2.5 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-2.5 text-base font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Save
          </button>
        </div>
      </form>
    </div>
  `
})
export class EditTaskFormComponent {
  @Input() task: Task | null = null;
  @Output() onSave = new EventEmitter<Task>();
  @Output() onCancel = new EventEmitter<void>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      todo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid && this.task) {
      this.onSave.emit({
        ...this.task,
        ...this.taskForm.value
      });
    }
  }
}


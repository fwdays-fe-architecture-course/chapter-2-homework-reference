import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Column } from "../../models/table.model";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table class="w-full text-sm text-left">
        <thead>
        <tr class="border-b bg-gray-50/50">
          <th
            *ngFor="let col of columns"
            class="px-6 py-4 font-medium text-gray-600"
            [class.cursor-pointer]="col.sortable"
            (click)="col.sortable && handleSort(col.prop)">
            <div class="flex items-center space-x-1">
              <span>{{ col.name }}</span>
              <span *ngIf="col.sortable && currentSortColumn === col.prop" class="text-gray-400">
                  {{ currentSortDirection === 'asc' ? '↑' : '↓' }}
                </span>
            </div>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
        <tr *ngFor="let item of data" class="hover:bg-gray-50/50">
          <td *ngFor="let col of columns" class="px-6 py-4">
            <ng-container *ngIf="col.prop !== 'actions' && col.prop !== 'status'; else specialColumn">
              <span class="text-gray-700">{{ item[col.prop] }}</span>
            </ng-container>
            <ng-template #specialColumn>
              <ng-container *ngIf="col.prop === 'status'; else actionsColumn">
                <div class="flex items-center">
                  <div
                    class="w-4 h-4 rounded-full border"
                    [class.bg-gray-200]="item.status === 'Todo'"
                    [class.bg-green-500]="item.status === 'Done'">
                  </div>
                  <span class="ml-2 text-gray-600">{{ item.status }}</span>
                </div>
              </ng-container>
              <ng-template #actionsColumn>
                <div class="flex items-center space-x-4">
                  <button
                    (click)="onEdit.emit(item)"
                    class="px-4 py-1.5 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                    Edit
                  </button>
                  <button
                    (click)="onDelete.emit(item)"
                    class="px-4 ml-px py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                    Delete
                  </button>
                </div>
              </ng-template>
            </ng-template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DataTableComponent {
  @Input() data: any[] | null = [];
  @Input() columns: Column[] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onSort = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  currentSortColumn: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  handleSort(column: string) {
    if (this.currentSortColumn === column) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column;
      this.currentSortDirection = 'asc';
    }

    this.onSort.emit({
      column: this.currentSortColumn,
      direction: this.currentSortDirection
    });
  }
}

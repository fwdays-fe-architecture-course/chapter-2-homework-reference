import { Routes } from '@angular/router';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: TaskTableComponent },
  { path: 'about-us', component: AboutUsComponent }
];

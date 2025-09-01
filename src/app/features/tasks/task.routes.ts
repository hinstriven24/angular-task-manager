import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

export const TASK_ROUTES: Routes = [
  { path: '', component: TaskListComponent },       // /tasks
  { path: 'add', component: TaskAddComponent },     // /tasks/add
  { path: 'edit/:id', component: TaskEditComponent } // /tasks/edit/:id
];

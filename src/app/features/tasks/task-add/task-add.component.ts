import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../models/task.model';
import { MatCardModule } from "@angular/material/card";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, MatCardModule],
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {
  constructor(private taskService: TaskService, private router: Router) {}

  addTask(task: Task): void {
    task.id = uuidv4();
    this.taskService.addTask(task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}

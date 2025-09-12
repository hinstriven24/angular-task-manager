import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { TaskService } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, MatCardModule, TaskFormComponent],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss',
})
export class TaskAddComponent {
  constructor(private taskService: TaskService, private router: Router) {}

  addTask(task: Omit<Task, 'id'>): void {
    // 确保 dueDate 是字符串
    const dueDate = typeof task.dueDate === 'string'
      ? task.dueDate
      : new Date(task.dueDate).toISOString();

    const payload: Omit<Task, 'id'> = {
      ...task,
      dueDate,
      // 确保其他字段有默认值
      title: task.title ?? '',
      description: task.description ?? '',
      completed: !!task.completed
    };

    this.taskService.addTask(payload).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}

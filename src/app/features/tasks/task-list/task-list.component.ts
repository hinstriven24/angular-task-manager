import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true; // ← 新增 loading 状态

  constructor(private taskService: TaskService,
    private cd: ChangeDetectorRef  // ← 注入
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('🔍 所有任务:', tasks);
        this.tasks = tasks;
        this.loading = false;
        this.cd.markForCheck(); // 确保变更检测
      },
      error: (err) => {
        console.error('加载任务失败:', err);
        this.loading = false;
        this.cd.markForCheck();
      }
    });
  }

  deleteTask(id: string): void {
    this.loading = true;
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks(); // 重新加载
    });
  }
}

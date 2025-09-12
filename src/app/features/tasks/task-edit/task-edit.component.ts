import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../models/task.model';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, MatCardModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent implements OnInit {
  task?: Task;
  taskId!: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    console.log('Editing task with ID:', this.taskId);
    this.taskService.getTaskById(this.taskId).subscribe({
    next: (task) => {
      console.log('✅ 成功获取任务:', task);
      this.task = task;
      this.cd.markForCheck(); // ✅ 强制 Angular 检查视图
    },
    error: (err) => {
      console.error('❌ 获取任务失败:', err);
    }
  });
  }

  /** Save updated task */
  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}

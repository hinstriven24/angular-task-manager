import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(this.taskId).subscribe((task) => {
      this.task = task;
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

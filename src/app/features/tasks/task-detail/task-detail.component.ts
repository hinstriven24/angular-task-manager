import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { MatCard,MatCardTitle,MatCardContent } from '@angular/material/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  imports: [NgIf, DatePipe, MatCard,MatCardTitle,MatCardContent]
})
export class TaskDetailComponent implements OnInit {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(id).subscribe((task) => (this.task = task));
  }
}

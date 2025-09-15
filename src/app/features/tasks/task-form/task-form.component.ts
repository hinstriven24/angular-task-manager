import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // 确保导入 MatSelectModule
import { MatIconModule  } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule, // ← 必须导入
    MatIconModule ,
    MatCheckboxModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() initialTask?: Partial<Task>;
  @Input() submitLabel = 'Save';
  @Output() formSubmit = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef // 用于强制变更检测
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    this.initForm();
    this.cd.markForCheck(); // ✅ 强制 Angular 检查视图，确保 submitLabel 立即更新
  }

  private initForm(): void {
    // 定义默认值
    const defaultTask: Partial<Task> = {
      title: '',
      description: '',
      dueDate: '',
      completed: false,
    };

    // 合并默认值和传入的 initialTask
    const task = { ...defaultTask, ...this.initialTask };

    if (this.form) {
      // 如果表单已存在，更新值
      this.form.setValue({
        title: task.title ?? '',
        description: task.description ?? '',
        dueDate: task.dueDate ?? null,
        completed: task.completed ?? false,
      });
    } else {
      // 创建新表单
      this.form = this.fb.group({
        title: [task.title ?? '', [Validators.required]],
        description: [task.description ?? ''],
        dueDate: [task.dueDate ?? null],
        completed: [task.completed ?? false],
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;

      // ✅ 只有编辑时才带 id，新增时不传 id
      const task = this.initialTask?.id
        ? { id: this.initialTask.id, ...formData }  // 编辑
        : { ...formData };                          // 新增 → 不传 id

      this.formSubmit.emit(task);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Task } from './features/tasks/models/task.model';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  // This is your initial seed
  createDb(reqInfo?: RequestInfo) {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Sample Task',
        description: 'This is a sample task',
        dueDate: new Date().toISOString(),
        completed: false,
      },
      {
        id: '2',
        title: 'Learn Angular',
        description: 'Work on Angular features',
        dueDate: new Date().toISOString(),
        completed: false,
      },
    ];
    return { tasks };
  }

  /**
   * Let the in-memory API generate string IDs for POST /api/tasks
   * so you don’t have to create them in the client.
   */
  genId(collection: Task[]): string {
    if (!collection || collection.length === 0) return '1';

    // 提取所有 id 为数字的，转成数字
    const numericIds = collection
      .map(t => Number(t.id))
      .filter(n => !isNaN(n) && n > 0); // 过滤掉 NaN 和负数

    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

    return String(maxId + 1);
  }
}

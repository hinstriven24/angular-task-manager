import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './features/tasks/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [
      { id: '1', title: 'Sample Task', description: 'This is a sample task', dueDate: new Date(), completed: false },
      { id: '2', title: 'Learn Angular', description: 'Work on Angular features', dueDate: new Date(), completed: false }
    ];
    return { tasks };
  }

  // Optional: generate a new ID
  genId(tasks: Task[]): string {
    return (tasks.length + 1).toString();
  }
}

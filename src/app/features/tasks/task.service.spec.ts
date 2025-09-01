import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  it('should add a task', () => {
    service.addTask('Test Task');
    expect(service.taskList()).toContain('Test Task');
  });

  it('should return initial tasks', () => {
    expect(service.taskList().length).toBeGreaterThan(0);
  });
});

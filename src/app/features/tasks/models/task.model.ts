export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;   // store as ISO string; use | date pipe in templates
  completed: boolean;
}

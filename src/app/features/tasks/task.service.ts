import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksUrl = 'api/tasks';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  getTaskById(id: string): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      catchError(this.handleError<Task>(`getTaskById id=${id}` as const))
    );
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    // let the in-memory server assign id; you don’t need to set it here
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>('addTask'))
    );
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.put<Task>(url, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>('updateTask'))
    );
  }

  deleteTask(id: string): Observable<{}> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError(this.handleError<{}>('deleteTask'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return new Observable<T>((subscriber) => {
        subscriber.next(result as T);
        subscriber.complete();
      });
    };
  }
}

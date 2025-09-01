import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = 'api/tasks'; // URL to web API
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET all tasks */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  /** GET task by id */
  getTaskById(id: string): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      catchError(this.handleError<Task>(`getTaskById id=${id}`))
    );
  }

  /** POST: add a new task */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /** PUT: update an existing task */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /** DELETE: delete a task by id */
  deleteTask(id: string): Observable<{}> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError(this.handleError<{}>('deleteTask'))
    );
  }

  /**
   * Handle HTTP operation that failed.
   * Let the app continue by returning an empty result.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error); // Log to console for now
      return new Observable<T>((subscriber) => {
        subscriber.next(result as T);
        subscriber.complete();
      });
    };
  }
}

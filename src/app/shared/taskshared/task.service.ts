import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from './task.model';
import { ParentTask } from './parent-task.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
}) 
export class TaskService {

  private taskUrl = "//localhost:9001/task";
  private rootUrl = "//localhost:9001/task";

  public task = null;
  public editTaskFlag = false;

  constructor(private http: HttpClient) { }

  addTask (task: Task): Observable<void> {
    var addUrl = this.taskUrl + "/add";
    return this.http.post<any>(addUrl, task, httpOptions).pipe(
      tap(() => this.log(`added task`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  getParentTask(): Observable<ParentTask[]>{
	return this.http.get<ParentTask[]>("//localhost:9001/parenttask/all")
      .pipe(
        tap(parentTasks => this.log(`fetched parentTasks`)),
        catchError(this.handleError('getParentTask', []))
      );
  }

  getTasksByProject(id: number): Observable<Task[]>{
  return this.http.get<Task[]>(this.rootUrl+"/project/"+id)
      .pipe(
        tap(Tasks => this.log(`fetched Tasks`)),
        catchError(this.handleError('getTasks', []))
      );
  }

  editTask (task: Task): Observable<any> {
    return this.http.put(this.rootUrl + "/update", task, httpOptions).pipe(
      tap(_ => this.log(`updated task`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  getAllTasks(): Observable<Task[]>{
	return this.http.get<Task[]>(this.rootUrl+"/all")
      .pipe(
        tap(Tasks => this.log(`fetched Tasks`)),
        catchError(this.handleError('getParentTask', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      
      console.error(error);

      
      this.log(`${operation} failed: ${error.message}`);

      
      return of(result as T);
    };

  }

  private log(message: string) {
    
    
  }
}

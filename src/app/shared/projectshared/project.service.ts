import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Project } from './project.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // private rootUrl = window["apiBaseUrl"]+"/project";
  private rootUrl = "//localhost:9001/project";

  constructor(private http: HttpClient) { }


   getProjects (): Observable<Project[]> {
      return this.http.get<Project[]>(this.rootUrl + "/all")
      .pipe(
        tap(projects => this.log(`fetched projects`)),
        catchError(this.handleError('getProjects', []))
      );
  }

  addProject(project: Project): Observable<Project> {
    
    return this.http.post<Project>(this.rootUrl, project, httpOptions);
  }

  deleteProject(projectId: number): any {
    return this.http.delete<any>(this.rootUrl + "/"+projectId, httpOptions).pipe(
      tap(_ => this.log(`deleted project `)),
      catchError(this.handleError<any>('deleteproject'))
    );
  }

  updateProject (project: Project): Observable<any> {
    return this.http.put(this.rootUrl, project, httpOptions).pipe(
      tap(_ => this.log(`updated project`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      
      console.error(error); // log to console instead

      
      this.log(`${operation} failed: ${error.message}`);

      
      return of(result as T);
    };
 
  }

  private log(message: string) {
  
    
  }
}

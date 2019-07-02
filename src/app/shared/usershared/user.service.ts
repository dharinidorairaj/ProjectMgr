import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';


import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "//localhost:9001"+"/user/all";
  private rootUrl = "//localhost:9001"+"/user";

 constructor(private http: HttpClient) { }


 getUsers (): Observable<User[]> {
     return this.http.get<User[]>(this.userUrl)
     .pipe(
       tap(users => this.log(`fetched users`)),
       catchError(this.handleError('getUsers', []))
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
   ///console.log(message);
 }



 /** POST: add a new user to the server */
 addUser (user: User): Observable<User> {

   var addUrl = "//localhost:9001"+"/user/add";

   return this.http.post<User>(addUrl, user, httpOptions);
  
 }

 deleteUser(userId: number): any {

    const url = "//localhost:9001"+"/user/" + userId;

   return this.http.delete<any>(url, httpOptions).pipe(
     tap(_ => this.log(`deleted user `)),
     catchError(this.handleError<any>('deleteuser'))
   );
 }

  /** PUT: update the user on the server */
 updateUser (user: User): Observable<any> {
   return this.http.put("//localhost:9001" + "/update", user, httpOptions).pipe(
     tap(_ => this.log(`updated user`)),
     catchError(this.handleError<any>('updateUser'))
   );
 }
}

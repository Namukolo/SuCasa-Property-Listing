import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, throwError, of } from "rxjs";


import { IUser } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userUrl = 'api/users';

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userUrl).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  createUser(user: IUser): Observable<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    user.id = null;

    return this.http.post<IUser>(this.userUrl, user, { headers })
      .pipe(
        tap(data => console.log('creating user: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An Error Occurred: ${err.error.message}`
    }
    else {
      errorMessage = `Server returned code:  ${err.status}, error message is:  ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";


import { IAdvert, IUser } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userUrl = `http://localhost:4200/users`;

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userUrl).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  createUser(user: IUser): Observable<IUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<IUser>(`${this.userUrl}/register`, user, { headers })
      .pipe(
        tap(data => console.log(``)),
        catchError(this.handleError)
      );
  }


  //TODO:: PUT THESE IN THEIR OWN SERVICE :SEPERATION OF CONCERN
  createAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<IAdvert>(`${this.userUrl}/add-advert`, advert, { headers })
      .pipe(
        tap(data => console.log(`in service adding advert`)),
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

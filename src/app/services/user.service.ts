import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";


import { IAdvert, IUser } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userUrl = `api/users`;
  private advertUrl = `api/adverts`;

  // private userUrl = `http://localhost:4200/api/users`;

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userUrl).pipe(
      tap(data => {
        JSON.stringify(data);
        console.log('USERS FROM getUsers', data)
      }),
      catchError(this.handleError)
    );
  }

  getAdverts(): Observable<IAdvert[]> {
    return this.http.get<IAdvert[]>(this.advertUrl).pipe(
      tap(data => {
        JSON.stringify(data);
        console.log('Adverts FROM getAdverts', data)
      }),
      catchError(this.handleError)
    );
  }

  // createUser(user: IUser): Observable<IUser> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
  //   user.id = null;
  //   // return this.http.post<IUser>(`${this.userUrl}`, user, { headers })
  //   return this.http.post<IUser>(`api/createUser`, user, { headers })
  //     .pipe(
  //       tap(),
  //       catchError(this.handleError)
  //     );
  // }
  createUser(user: IUser) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    user.id = null;
    return this.http.post<IUser>(`${this.userUrl}`, user, { headers })
    // return this.http.post<any>(`api/createUser`, user)
      .pipe(
        tap(),
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<IUser> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<IUser>(url)
        .pipe(
            tap(data => (JSON.stringify(data))),
            catchError(this.handleError)
        );
}

  login(email: string, password: string) {
    return this.http.post<any>(`api/users/authenticate`, { email: email, password: password })
      .pipe(map(user => {
        // login is successful if there's a 'jwt' token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  //TODO:: PUT THESE IN THEIR OWN SERVICE :SEPERATION OF CONCERN
  createAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    advert.id = null;
    console.log(advert)
    return this.http.post<IAdvert>(`api/new-advert`, advert, { headers })
      .pipe(
        tap(data => console.log('creating salary: ' + (data))),
        catchError(this.handleError)
      );
  }

//   createSalary(salary: ISalary): Observable<ISalary> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     //in memory api needs id to be null
//     salary.id = null;
//     return this.http.post<ISalary>(this.salaryUrl, salary, { headers })
//         .pipe(
//             tap(data => console.log('creating salary: ' + JSON.stringify(data))),
//             catchError(this.handleError)
//         );
// }


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

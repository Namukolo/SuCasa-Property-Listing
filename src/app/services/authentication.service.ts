import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StateService } from './state.service';
import { AccessLevel, IUser } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private stateService: StateService) { }
  // changed
  // setAccessLevel(value: AccessLevel) {

  setAccessLevel(value: AccessLevel): void {
    this.stateService.currentUserAccessLevel = value;
  }
  //changed 
  // login(email: string, password: string): {

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<any>(`api/authenticate`, { email: email, password: password })
      .pipe(map(user => {
        // login is successful if there's a 'jwt' token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  getLoggedInUser(): IUser {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser
  }
  //changed
  // logout(): void {

  logout(): void {
    this.setAccessLevel(AccessLevel.uu);
    //Removes currentUser from local storge effectively logging them out
    localStorage.removeItem('currentUser');
  }
}

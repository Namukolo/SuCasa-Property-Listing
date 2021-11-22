import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StateService } from './state.service';
import { AccessLevel, IUser } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private stateService: StateService) { }

  setAccessLevel(value: AccessLevel) {
    this.stateService.currentUserAccessLevel = value;
  }

  login(email: string, password: string) {
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

  logout() {
    this.setAccessLevel(AccessLevel.uu);
    //Removes currentUser from local storge effectively logging them out
    localStorage.removeItem('currentUser');
  }
}

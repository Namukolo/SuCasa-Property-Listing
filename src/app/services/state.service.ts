import { Injectable } from '@angular/core';
import { AccessLevel, IUser } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  //Property bag to manage state and what version of the navigation is shown
  currentUserAccessLevel: AccessLevel;
  showNavigation: boolean;
  users: IUser[]

  constructor() { }

  getUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    console.log(users)
    return users;
  }

}

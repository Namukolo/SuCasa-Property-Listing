import { Injectable } from '@angular/core';
import { AccessLevel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  //Property bag to manage state and what version of the navigation is shown
  currentUserAccessLevel: AccessLevel;
  showNavigation:boolean;
  constructor() { }
}

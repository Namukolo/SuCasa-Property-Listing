import { Injectable } from '@angular/core';
import { AccessLevel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  currentUserAccessLevel: AccessLevel;
  showNavigation:boolean;
  constructor() { }
}

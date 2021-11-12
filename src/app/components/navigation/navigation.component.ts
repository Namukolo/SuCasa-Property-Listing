import { Component, OnInit } from '@angular/core';
import { AccessLevel, IUser } from 'src/app/models/user';

@Component({
  selector: 'sc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currentUser: IUser;
  userAccessLevel: AccessLevel;
  constructor() { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.userAccessLevel = this.currentUser.accessLevel;
    }
  }
}

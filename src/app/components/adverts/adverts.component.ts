import { Component, OnInit } from '@angular/core';
import { IAdvert, IUser } from 'src/app/models/user';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'sc-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {

  constructor(private stateService: StateService) { }
  currentUser: IUser;
  adverts: IAdvert[];

  // getAccessLevel() {
  //   return this.stateService.getAccessLevel();
  // }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.adverts = this.currentUser.adverts;
    // console.log('USER STATE ACCESS LEVEL:', this.stateService.currentUserAccessLevel)
    // console.log(this.adverts);
    // console.log(this.getAccessLevel);
  }

  delete() {
    console.log(localStorage.getItem('users'))
    localStorage.removeItem('users')
    console.log(localStorage.getItem('users'))
  }

}

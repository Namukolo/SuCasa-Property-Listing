import { Component, OnInit } from '@angular/core';
import { IAdvert, IUser } from 'src/app/models/user';

@Component({
  selector: 'sc-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {

  constructor() { }
  currentUser: IUser;
  adverts: IAdvert[];


  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.adverts = this.currentUser.adverts;
    console.log(this.adverts);
  }

  delete(){
    console.log(localStorage.getItem('users'))
    localStorage.removeItem('users')
    console.log(localStorage.getItem('users'))
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdvert, IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'sc-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {

  constructor(private stateService: StateService, private authenticationService: AuthenticationService, private router: Router) { }
  currentUser: IUser;
  adverts: IAdvert[];

  ngOnInit(): void {
    if(!this.authenticationService.getLoggedInUser()){
      this.router.navigate(['/login'])
    }
    this.currentUser = this.authenticationService.getLoggedInUser();
    this.adverts = this.currentUser.adverts;
    this.adverts = this.adverts.reverse();
  }

  printUser(){
    console.log(JSON.parse(localStorage.getItem('currentUser')))
  }

  delete() {
    localStorage.removeItem('users')
  }

}

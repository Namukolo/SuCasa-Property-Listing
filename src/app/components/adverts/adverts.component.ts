import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdvert, IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {

  constructor(private stateService: StateService, private authenticationService: AuthenticationService, private router: Router, private userService: UserService) { }
  // User: IUser;
  adverts: IAdvert[];
  users: IUser[];
  currentUser: IUser;

  ngOnInit(): void {
    if(!this.authenticationService.getLoggedInUser()){
      this.router.navigate(['/login'])
    }

    this.currentUser = this.authenticationService.getLoggedInUser();
    this.getCurrentUser(this.currentUser.id);
    console.log(this.currentUser)
    // this.currentUser = this.getCurrentUser(this.localStorageUser.id);
    this.adverts = this.currentUser.adverts;
    this.adverts = this.adverts.reverse();
  }

  getCurrentUser(userId: number): void{
    this.userService.getUser(userId).pipe().subscribe({
      next: (user: IUser) => localStorage.setItem('currentUser',JSON.stringify(user)),
      error: err => console.log(err)
    })
  }


  printUser(){
    console.log(JSON.parse(localStorage.getItem('currentUser')))
  }

  delete() {
    localStorage.removeItem('users')
  }

}

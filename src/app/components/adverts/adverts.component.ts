import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdvert, IUser, Status } from 'src/app/models/user';
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
  allAdverts: IAdvert[];
  users: IUser[];
  currentUser: IUser;
  userAdverts: IAdvert[];

  ngOnInit(): void {
    if (!this.authenticationService.getLoggedInUser()) {
      this.router.navigate(['/login'])
    }
    //get logged in user from local storage
    this.currentUser = this.authenticationService.getLoggedInUser();
    console.log(this.currentUser)

    //get current user from api using id
    this.getCurrentUser(this.currentUser.id);

    this.userService.getAdverts().pipe().subscribe({
      next: adverts => {
        this.allAdverts = [...adverts];
        this.allAdverts = this.allAdverts.filter(advert => {
          return (advert.userID === this.currentUser.id && advert.status != 'DELETED')
        });
      },
      error: err => console.log(err)
    });

  }

  getCurrentUser(userId: number): void {
    console.log(userId)
    this.userService.getUser(userId).pipe().subscribe({
      next: (user: IUser) => {
        // console.log('user', user)
        localStorage.setItem('currentUser', JSON.stringify(user))
      },
      error: err => console.log(err)
    })
  }




  printUser() {
    console.log(JSON.parse(localStorage.getItem('currentUser')))
  }

  delete() {
    localStorage.removeItem('users')
  }

  onStatusClick(advert: IAdvert) {
    const clickedAdvert = this.allAdverts.filter(userAdvert => advert.id === userAdvert.id)[0];
    if (clickedAdvert.status == Status.hiddden) {
      clickedAdvert.status = Status.live
    }
    else if (clickedAdvert.status == Status.live) {
      clickedAdvert.status = Status.hiddden
    }

    //IN MEMORY API DOESNT HAVE AN IMPLEMENTATION FOR PATCH SO IM USING UPDATE
    this.userService.updateAdvert(clickedAdvert)
      .pipe()
      .subscribe({
        next: () => console.log('updated', advert),
        error: (err: any) => console.log(err)
      })

  }

  onDeleteClick(advert: IAdvert) {
    const clickedAdvert = this.allAdverts.filter(userAdvert => advert.id === userAdvert.id)[0];
    clickedAdvert.status = Status.deleted
    console.log(clickedAdvert.status)
    //IN MEMORY API DOESNT HAVE AN IMPLEMENTATION FOR PATCH SO IM USING UPDATE
    this.userService.updateAdvert(clickedAdvert)
      .pipe()
      .subscribe({
        next: () => this.ngOnInit(),
        error: (err: any) => console.log(err)
      })

  }



}

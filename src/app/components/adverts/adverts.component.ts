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
          console.log('Filtering by', this.currentUser.id);
          return advert.userID === this.currentUser.id
        });
        console.log('After Filter', this.allAdverts)
      },
      error: err => console.log(err)
    });

    // this.userAdverts = this.allAdverts.filter(advert => advert.userID === this.currentUser.id)

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

  onStatusClick(e: Event, advert: IAdvert){
    const clickedAdvert = this.allAdverts.filter(userAdvert => advert.id === userAdvert.id)[0];
    console.log(advert)
    // console.log(clickedAdvert.id)
    // clickedAdvert.status = Status.hiddden;
    if(clickedAdvert.status == Status.hiddden){
      clickedAdvert.status = Status.live
      // status.status = Status.live
    }
    else if(clickedAdvert.status == Status.live){
      clickedAdvert.status = Status.hiddden
      // status.status = Status.hiddden
    }
    //IN MEMORY API DOESNT HAVE AN IMPLEMENTATION FOR PATCH SO IM USING UPDATE
    this.userService.updateAdvert(clickedAdvert)
          .pipe()
          .subscribe({
            next: () => console.log('updated', advert),
            error: (err:any) => console.log(err)
          })



    // this.userService.updateStatus(status, clickedAdvert.id).pipe().subscribe({
    //   next: (advert: IAdvert) => {
    //     console.log('updated advert status', advert) 
    //   },
    //   error: err => console.log(err)
    // })
    
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessLevel, IAdvert, IUser, Status } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-advert-management',
  templateUrl: './advert-management.component.html',
  styleUrls: ['./advert-management.component.scss']
})
export class AdvertManagementComponent implements OnInit {

  allUsers: IUser[]
  filteredUsers: IUser[]
  private _userSearch: string = '';
  user: IUser
  success: boolean
  filteredAdverts: IAdvert[]

  constructor(private authenticationService: AuthenticationService, private router: Router, private userService: UserService, private fb: FormBuilder) { }


  ngOnInit(): void {
    if (this.authenticationService.getLoggedInUser().accessLevel !== AccessLevel.admin) {
      this.router.navigate(['/login'])
    }

    this.userService.getUsers().subscribe({
      next: (users: IUser[]) => {
        this.allUsers = users;
        this.filteredUsers = this.allUsers;
        console.log(this.filteredUsers)
      },
      error: (err: string) => console.log('something went wrong', err)
    })

  }


  get userSearch(): string {
    return this._userSearch;
  }

  set userSearch(value: string) {
    this._userSearch = value;
    this.filteredUsers = this.performSearch(value);
  }

  performSearch(searchBy: string): IUser[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.allUsers.filter((user: IUser) => user.surname.toLowerCase().includes(searchBy));
  }

  getAdverts(user: IUser) {
    this.userService.getAdverts().subscribe({
      next: (adverts: IAdvert[]) => { this.filteredAdverts = adverts.filter((advert: IAdvert) => advert.userID === user.id); console.log(this.filteredAdverts) },
      error: (err: string) => console.log('something went wrong', err)
    })
  }

  statusChange(advert: IAdvert, status: String): void {
    const clickedAdvert = this.filteredAdverts.filter(userAdvert => advert.id === userAdvert.id)[0];
    if (status === 'LIVE') {
      clickedAdvert.status = Status.live
    }
    else if (status === 'HIDDEN') {
      clickedAdvert.status = Status.hidden

    }
    else if (status === 'DELETED') {
      clickedAdvert.status = Status.deleted
    }

    //IN MEMORY API DOESNT HAVE AN IMPLEMENTATION FOR PATCH SO IM USING PUT
    this.userService.updateAdvert(clickedAdvert)
      .subscribe({
        error: (err: any) => console.log(err)
      })
  }


}

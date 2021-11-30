import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdvert } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-favourite-adverts',
  templateUrl: './favourite-adverts.component.html',
  styleUrls: ['./favourite-adverts.component.scss']
})
export class FavouriteAdvertsComponent implements OnInit {
  favourites: IAdvert[]
  constructor(private authenticationService: AuthenticationService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (!this.authenticationService.getLoggedInUser()) {
      this.favourites = JSON.parse(localStorage.getItem("favourites") || '[]');
      console.log('localStorage Ads', this.favourites)
      return
      // let currentAds: IAdvert[] = []
      // const currentFavAds = JSON.parse(localStorage.getItem("favourites") || '[]');
      // currentAds.push(currentFavAds)
      // this.favourites = currentAds;
      // console.log('unauth favs', this.favourites)
    }

    const currentUser = this.authenticationService.getLoggedInUser();

    this.userService.getFavourites().subscribe({
      next: (favourites: IAdvert[]) => { this.favourites = favourites.filter((favourite: IAdvert) => favourite.favUserID === currentUser.id), console.log('users  favourites', this.favourites) },
      error: (err: string) => console.log('something went wrong', err)
    })
  }

  delete(): void {
    localStorage.clear()
  }



  unfavourite(advert: IAdvert): void {
    this.userService.deleteFavourite(advert.id).subscribe({
      next: () => this.ngOnInit(),
      error: (err: string) => console.log('something went wrong', err)
    })
  }

}

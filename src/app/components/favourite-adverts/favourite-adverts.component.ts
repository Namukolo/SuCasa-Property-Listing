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
      this.favourites = this.favourites.reverse()
      console.log('localStorage Ads', this.favourites)
      return
    }

    const currentUser = this.authenticationService.getLoggedInUser();

    this.userService.getFavourites().subscribe({
      next: (favourites: IAdvert[]) => this.favourites = favourites.filter((favourite: IAdvert) => favourite.favUserID === currentUser.id).reverse(),
      error: (err: string) => console.log('something went wrong', err)
    })
  }

  unfavourite(advert: IAdvert): void {

    if (!this.authenticationService.getLoggedInUser()) {
      const currentFavAds = JSON.parse(localStorage.getItem("favourites") || '[]');
      currentFavAds.splice(currentFavAds.findIndex((favourite: IAdvert) => favourite.id === advert.id), 1)
      localStorage.setItem("favourites", JSON.stringify(currentFavAds));
      this.ngOnInit()
      return
    }
    this.userService.deleteFavourite(advert.id).subscribe({
      next: () => this.ngOnInit(),
      error: (err: string) => console.log('something went wrong', err)
    })
  }

}

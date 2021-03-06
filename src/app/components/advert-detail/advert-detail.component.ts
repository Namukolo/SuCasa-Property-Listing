import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IAdvert, IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {
  private sub: Subscription
  advert: IAdvert
  contactSellerForm: FormGroup
  seller: IUser;
  success: boolean;
  favourite: boolean
  loggedUser: IUser
  favourites: IAdvert[]

  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = this.authenticationService.getLoggedInUser();

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getAdvert(id);
      }
    );

    this.contactSellerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.minLength(0), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    })

    this.userService.getFavourites().subscribe({
      next: (favourites) => this.favourites = favourites
    })
  }

  sendMessage(): void {
    if (this.contactSellerForm.valid) {
      if (this.contactSellerForm.dirty) {
        this.contactSellerForm.reset()
        this.success = true;
      }
    } else {
      this.success = false
    }
  }

  getAdvert(id: number): void {
    this.userService.getAdvert(id)
      .pipe(delay(1000))
      .subscribe({
        next: (advert: IAdvert) => {
          this.advert = advert;
          this.getSellerInfo(advert.userID)
        },
        error: (err: string) => console.log('something went wrong: ', err)
      });
  }

  getSellerInfo(sellerID: number): void {
    this.userService.getUser(sellerID).subscribe({
      next: (user: IUser) => this.seller = user
    })
  }

  addFavourite(): void {
    if (!this.loggedUser) {
      const currentFavAds = JSON.parse(localStorage.getItem("favourites") || '[]');

      if ((currentFavAds.filter((advert: IAdvert) => advert.id === this.advert.id)).length > 0) {
        this.favourite = true;
        return
      }

      currentFavAds.push(this.advert)
      localStorage.setItem("favourites", JSON.stringify(currentFavAds));
      this.favourite = true;
      return
    }

    else if (this.loggedUser) {
      if ((this.favourites.filter((advert: IAdvert) => advert.id === this.advert.id)).length > 0) {
        this.favourite = true
        return
      }

      let favouriteAdvert = { ...this.advert };
      favouriteAdvert.favUserID = this.loggedUser.id
      this.userService.createFavourite(favouriteAdvert).subscribe({
        next: () => this.favourite = true,
        error: (err: string) => console.log('something went wrong', err)
      })
    }
  }
}

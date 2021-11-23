import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {
  sellerProfileForm: FormGroup;
  currentUser: IUser;
  user: IUser;
  btnText: string = 'Update';
  success: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.getLoggedInUser()) {
      this.router.navigate(['/login'])
    }

    this.sellerProfileForm = this.fb.group({
      email: ['', [Validators.minLength(6), Validators.maxLength(100), Validators.email]],
      phoneNumber: ['', [Validators.minLength(6), Validators.maxLength(30)]]
    });


    this.currentUser = this.authenticationService.getLoggedInUser();
    this.getUser(this.currentUser.id)
  }

  getUser(userID: number) {
    this.userService.getUser(userID).subscribe({
      next: loggedUser => {
        this.displayUser(loggedUser)
      },
      error: err => console.log('something went wrong', err)
    })
  }

  displayUser(user: IUser) {
    this.user = user;
    this.sellerProfileForm.patchValue(
      {
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
    )
  }

  submitForm() {
    if (this.sellerProfileForm.valid) {
      if (this.sellerProfileForm.dirty) {
        this.success = true;
        console.log('old user', this.user)
        let newUserObject = { ...this.user, ...this.sellerProfileForm.value }

        this.btnText = 'Updating...';
        this.userService.updateUser(newUserObject)
          .pipe(delay(2000))
          .subscribe({
            next: (user) => { console.log('updated user', user), this.onSaveComplete() },
            error: (err: any) => console.log(err)
          })
      }
    } else {
      this.success = false;
    }
  }

  onSaveComplete() {
    this.sellerProfileForm.reset();
    this.router.navigate(['/my-adverts'])
  }
}

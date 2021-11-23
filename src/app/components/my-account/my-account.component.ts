import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const password = c.get('newPassword');
  const confirmPassword = c.get('confirmPassword');

  if (confirmPassword.pristine || password.pristine) {
    return null;
  }

  if (password.value === confirmPassword.value) {
    return null;
  }

  return { match: true }
}

function noSpaces(c: AbstractControl): { [key: string]: boolean } | null {
  const password = c.get('newPassword')
  if ((password.value) && (password.value as string).indexOf(' ') >= 0) {
    return { noSpaces: true }
  }

  return null;
}

@Component({
  selector: 'sc-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  myAccountForm: FormGroup;
  user: IUser;
  currentUser: IUser
  incorrectPassword: boolean;
  success: boolean;
  btnText: string = 'Update'

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.getLoggedInUser()) {
      this.router.navigate(['/login'])
    }

    this.currentUser = this.authenticationService.getLoggedInUser();
    this.getUser(this.currentUser.id)
    // this.myAccountForm = this.fb.group({
    //     forenames: [this.user?.forenames, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    //     surname: [this.user?.surname, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    //     email: [this.user?.email, [Validators.minLength(6), Validators.maxLength(100), Validators.email, Validators.required]],
    //     oldPassword: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    //     passwordGroup: this.fb.group({
    //       password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    //       confirmPassword: ['', Validators.required]
    //     }, { validator: [passwordMatcher, noSpaces] })
    //   });


    this.myAccountForm = this.fb.group({
      forenames: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      surname: ['', [Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.minLength(6), Validators.maxLength(100), Validators.email]],
      password: ['', Validators.required],
      passwordGroup: this.fb.group({
        newPassword: ['', [Validators.minLength(8), Validators.maxLength(100)]],
        confirmPassword: ['']
      }, { validator: [passwordMatcher, noSpaces] })
    });

  }

  getUser(userID: number) {
    this.userService.getUser(userID).subscribe({
      next: loggedUser => {
        // this.user = loggedUser
        this.displayUser(loggedUser)
      },
      error: err => console.log('something went wrong', err)
    })
  }

  displayUser(user: IUser) {
    this.user = user;
    this.myAccountForm.patchValue(
      {
        forenames: user.forenames,
        surname: user.surname,
        email: user.email
      }
    )
  }

  submitForm() {
    if (this.myAccountForm.valid) {
      if (this.myAccountForm.dirty) {

        if (this.myAccountForm.get('password').value !== this.user.password) {
          this.incorrectPassword = true;
          this.success = true;
          return;
        }

        this.success = true;
        this.incorrectPassword = false;
        console.log('old user', this.user)
        let newUserObject = { ...this.user, ...this.myAccountForm.value }

        if (newUserObject.passwordGroup.newPassword) {
          newUserObject.password = newUserObject.passwordGroup.newPassword;
        }

        this.btnText = 'Updating...';
        this.userService.updateUser(newUserObject)
          .pipe(delay(2000))
          .subscribe({
            next: (user) => {console.log('updated user', user), this.onSaveComplete()},
            error: (err: any) => console.log(err)
          })
      }
    } else {
      this.success = false;
      this.incorrectPassword = false
    }
  }


  onSaveComplete() {
    this.myAccountForm.reset();
    this.router.navigate(['/my-adverts'])
  }
}

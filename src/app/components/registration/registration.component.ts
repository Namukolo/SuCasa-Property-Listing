import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { ActivatedRoute, Router } from '@angular/router';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const password = c.get('password');
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
  const password = c.get('password')
  if ((password.value) && (password.value as string).indexOf(' ') >= 0) {
    return { noSpaces: true }
  }

  return null;
}


@Component({
  selector: 'sc-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userForm: FormGroup;
  user: IUser;
  private errorMessage: String;
  failed = false;
  success = false;
  userExists = false;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      forenames: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      surname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.minLength(6), Validators.maxLength(100), Validators.email, Validators.required]],

      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
        confirmPassword: ['', Validators.required]
      }, { validator: [passwordMatcher, noSpaces] })

    });

    this.failed = false;
    this.success = false;
    this.userExists = false;

  }

  registerUser() {
    if (!this.userForm.valid) {
      this.failed = true;
      return;
    }

    let p = { ...this.user, ...this.userForm.value };
    this.userService.createUser(p)
      .subscribe({
        next: () => this.onRegisterComplete(),
        error: err => { this.userExists = true; return; }
      });
    this.userExists = false;
    this.failed = false;
    this.success = true;
  }

  onRegisterComplete(): void {
    this.userForm.reset();
    this.router.navigate(['/login']);
  }

}


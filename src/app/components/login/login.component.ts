import { Component, OnInit } from '@angular/core';
import { AccessLevel, IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { StateService } from 'src/app/services/state.service';




@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: IUser;
  allUsers: IUser[] = [];
  errorMessage = '';
  invalid = false;
  success = false;
  failedLogin = false
  returnUrl: string;



  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private stateService: StateService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.userService.getUsers().subscribe({
      next: users => {
        this.allUsers = [...users];
      },
    })

    this.invalid = false;
    this.success = false;
    this.failedLogin = false;

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //getter and setter to update state
  setAccessLevel(accessLevel: AccessLevel) {
    this.stateService.currentUserAccessLevel = accessLevel;
  }

  getAccessLevel() {
    return this.stateService.currentUserAccessLevel;
  }

  delete() {
    localStorage.removeItem('users')
  }

  login() {
    if (!this.loginForm.valid) {
      this.invalid = true;
      this.failedLogin = false;
      return;
    }

    this.failedLogin = false;
    this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
          this.success = true;
          this.setAccessLevel(data.accessLevel);
          this.router.navigate(['/my-adverts']);
        },
        error => {
          this.failedLogin = true;
          this.invalid = false;
        });
  }
}

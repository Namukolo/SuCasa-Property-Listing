import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';




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
  failed = false;
  success = false;
  failedLogin = false
  returnUrl: string;


  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.minLength(6), Validators.maxLength(100), Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });

    this.userService.getUsers().subscribe({
      next: users => {
        this.allUsers = [...users];
        // console.log('all Users', this.allUsers)
      },
    })

    this.failed = false;
    this.success = false;
    this.failedLogin = false;

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  login(){

    if (!this.loginForm.valid) {
      console.log('form invalid')
      this.failed = true;
      return;
    }

    this.failedLogin = false;
    console.log(`EMAIL:${this.loginForm.get('email').value} PASSWORD:${this.loginForm.get('password').value} `)
    this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/my-adverts']);
                },
                error => {
                    console.log('ERROR FROM LOGIN',error)
                    this.failedLogin = true;
                });
  }
}

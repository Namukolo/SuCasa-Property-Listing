import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AccessLevel, IUser} from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  allUsers: IUser[]
  filteredUsers: IUser[]
  private _userSearch: string = '';
  emailChangeForm: FormGroup
  user: IUser
  success: boolean

  constructor(private authenticationService: AuthenticationService, private router: Router, private userService: UserService, private fb: FormBuilder) { }

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

  ngOnInit(): void {

    if (this.authenticationService.getLoggedInUser().accessLevel !== AccessLevel.admin) {
      this.router.navigate(['/login'])
    }

    this.userService.getUsers().subscribe({
      next: (users: IUser[]) => {
        this.allUsers = users;
        this.filteredUsers = this.allUsers;
      },
      error: (err: string) => console.log('something went wrong', err)
    })
  }

  fetchEmail(user: IUser): void {
    this.userService.getUser(user.id).subscribe({
      next: (user: IUser) => { this.user = user, this.displayForm() },
      error: (err: string) => console.log('something went wrong', err)
    })
  }

  displayForm(): void {
    this.emailChangeForm = this.fb.group({
      email: [this.user.email, Validators.email]
    })
  }

  updateEmail(): void {
    if (this.emailChangeForm.valid) {
      if (this.emailChangeForm.dirty) {
        let newUserObject = { ...this.user, ...this.emailChangeForm.value }

        this.userService.updateUser(newUserObject)
          .pipe(delay(1000))
          .subscribe({
            next: () => this.onSaveComplete(),
            error: (err: any) => console.log(err)
          })
      }
    } else {
      this.success = false;
    }
  }

  unlockAccount(user: IUser): void {
    user.locked = false;
    this.userService.updateUser(user)
      .subscribe({
        error: (err: any) => console.log(err)
      })
  }

  onSaveComplete(): void {
    this.emailChangeForm.reset()
    this.ngOnInit()
  }
}

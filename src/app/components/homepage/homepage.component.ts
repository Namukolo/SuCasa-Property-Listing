import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  allUsers: IUser[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('hello')
    this.userService.getUsers().subscribe({
      next: users => {
        this.allUsers = [...users];
      },
    })

    this.userService.login('email@gmail.com', 'Bongani123').pipe().subscribe(
      data => data,
      error => console.log('mistake')
    )

  }

  }

  



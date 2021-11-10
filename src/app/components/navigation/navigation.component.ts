import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'sc-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLoggedIn:boolean;
  isNotLoggedIn:boolean;
  constructor() { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');

    if(!currentUser){
      this.isNotLoggedIn = true;
    }
    
    if(currentUser){
      this.isLoggedIn = true
    }
    
  }

}

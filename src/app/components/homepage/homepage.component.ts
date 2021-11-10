import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  currentUser = localStorage.getItem('currentUser');

  ngOnInit(): void {

  }

  currentUserinfo(){
    let currentUser = JSON.parse(this.currentUser)
    let currentUserAccess = currentUser.accessLevel;
    if(currentUserAccess === 'ADMIN'){
      console.log('You are God baby')
    } else{
      console.log('get outta my face you stooge')
    }
  }

}

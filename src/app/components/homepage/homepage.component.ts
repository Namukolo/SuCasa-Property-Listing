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

}

import { Component, OnInit } from '@angular/core';
import { IAdvert } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-advert-list',
  templateUrl: './advert-list.component.html',
  styleUrls: ['./advert-list.component.scss']
})
export class AdvertListComponent implements OnInit {
  allAdverts: IAdvert[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdverts().subscribe({
      next: adverts => this.allAdverts = adverts.filter(advert => advert.status === 'LIVE'),
      error: err => console.log('something went wrong: ', err)
    })
  }

}

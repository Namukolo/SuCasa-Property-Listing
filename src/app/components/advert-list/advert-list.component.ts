import { Component, OnInit } from '@angular/core';
import { IAdvert } from 'src/app/models/user';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-advert-list',
  templateUrl: './advert-list.component.html',
  styleUrls: ['./advert-list.component.scss']
})
export class AdvertListComponent implements OnInit {
  allAdverts: IAdvert[] = [];
  filteredAdverts: IAdvert[];
  searchedAds: IAdvert[]
  constructor(private userService: UserService, private stateService: StateService) { }

  ngOnInit(): void {
    this.searchedAds = this.stateService.searchedAdverts

    this.userService.getAdverts().subscribe({
      next: (adverts: IAdvert[]) => {
        this.allAdverts = adverts.filter(advert => advert.status === 'LIVE').reverse();
        this.filteredAdverts = this.searchedAds?.length >= 1 ? [...this.searchedAds] : this.allAdverts;
      },
      error: err => console.log('something went wrong: ', err)
    })

  }

  setSearchedAdverts(adverts: IAdvert[]) {
    this.stateService.searchedAdverts = [...adverts];
  }

  onSearchClicked() {
    console.log('search was clicked')
    this.ngOnInit();
  }
}

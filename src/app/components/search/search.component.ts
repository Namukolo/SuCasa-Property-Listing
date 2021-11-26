import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IAdvert, Status } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup
  country: any[];
  selectedProvince: any = { name: '', cities: [] }
  adverts: IAdvert[];
  filteredAdverts: IAdvert[];
  sub: Subscription
  success: boolean
  searchParameters = { province: '', city: '', minPrice: 0, maxPrice: 0, keywords: '' };

  @Output() searchClicked: EventEmitter<IAdvert[]> = new EventEmitter<IAdvert[]>();

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private stateService: StateService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      province: ['', Validators.required],
      city: [''],
      minPrice: [''],
      maxPrice: [''],
      keywords: [''],
    });

    this.userService.getProvinces().subscribe(
      {
        next: (data) => this.country = data,
        error: (error) => console.log(error)
      }
    )

    this.userService.getAdverts().subscribe({
      next: (adverts: IAdvert[]) => {
        this.adverts = adverts.filter(advert => advert.status === Status.live)
        this.filteredAdverts = this.adverts
      },
      error: (err: string) => console.log('something went wrong', err)
    })

    // PROVINCE
    this.searchForm.get('province').valueChanges.subscribe(
      value => {
        let province = this.country.filter(province => province.name === value)
        this.selectedProvince = province[0];
        this.searchParameters.province = value;
        this.searchParameters.city = '';
      }
    )

    // CITY CHANGE
    this.searchForm.get('city').valueChanges.subscribe(
      value => {
        this.searchParameters.city = value;
      }
    )

    // MINIMUM PRICE CHANGE
    this.searchForm.get('minPrice').valueChanges.subscribe(
      value => {
        this.searchParameters.minPrice = value;
      }
    )

    // MAXIMUM PRICE CHANGE
    this.searchForm.get('maxPrice').valueChanges.subscribe(
      value => {
        this.searchParameters.maxPrice = value;
      }
    )

    // KEYWORD CHANGE
    this.sub = this.searchForm.get('keywords').valueChanges.pipe(debounceTime(1000)).subscribe(
      value => {
        this.searchParameters.keywords = value;
      })

  }

  getSearchedAdverts(): IAdvert[] {
    return this.stateService.searchedAdverts;
  }

  setSearchedAdverts(adverts: IAdvert[]) {
    this.stateService.searchedAdverts = [...adverts];
  }

  search() {
    if (this.searchForm.valid) {
      if (this.searchForm.dirty) {
        if (this.searchParameters.province) {
          // console.log('PRESENT PROVINCE', this.searchParameters.province)
          this.filteredAdverts = this.filteredAdverts.filter(advert => advert.province === this.searchParameters.province)
        }
        if (this.searchParameters.city) {
          // console.log('PRESENT CITY', this.searchParameters.city)
          this.filteredAdverts = this.filteredAdverts.filter(advert => advert.city === this.searchParameters.city)
        }
        if (this.searchParameters.maxPrice) {
          // console.log('PRESENT MAX', this.searchParameters.maxPrice)
          this.filteredAdverts = this.filteredAdverts.filter(advert => advert.price <= this.searchParameters.maxPrice)
    
        }
        if (this.searchParameters.minPrice) {
          // console.log('PRESENT MIN', this.searchParameters.minPrice)
          this.filteredAdverts = this.filteredAdverts.filter(advert => advert.price >= this.searchParameters.minPrice)
    
        }
        if (this.searchParameters.keywords) {
          // console.log('PRESENT KEYWORDS', this.searchParameters.keywords)
          this.filteredAdverts = this.filteredAdverts.filter(advert => advert.description.toLowerCase().includes(this.searchParameters.keywords.toLowerCase()) || advert.headline.toLowerCase().includes(this.searchParameters.keywords.toLowerCase()))
    
        }
        const featuredAdverts = this.filteredAdverts.filter(advert => advert.featured).reverse()
        // a.sort((a, b) => b - a).reverse();
        const ads = this.filteredAdverts.filter(advert => !advert.featured).reverse();
        const allAds = [...featuredAdverts, ...ads]
        // console.log('featured ads in search',featuredAdverts)
        // this.setSearchedAdverts(this.filteredAdverts)
        this.setSearchedAdverts(allAds)
    
        // console.log('searched ads', this.filteredAdverts)
        this.searchClicked.emit(this.filteredAdverts);
        this.searchForm.reset()
        this.router.navigate(['/for-sale']);
        this.ngOnInit()
      }
    }
    this.success = false;
    
  }

}

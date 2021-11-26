import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IAdvert, Status } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-featured-adverts',
  templateUrl: './featured-adverts.component.html',
  styleUrls: ['./featured-adverts.component.scss']
})
export class FeaturedAdvertsComponent implements OnInit {
adverts: IAdvert[]
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdverts().subscribe({
      next: (adverts) => {this.adverts = adverts.filter(advert => advert.status == Status.live && advert.featured).reverse(), console.log(this.adverts)},
      // err: (err: string) => console.log('something went wrong: ', err)
    })
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ["<div class='nav-btn prev-slide'><</div>","<div class='nav-btn next-slide'>></div>"],
    margin: 20, 
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  
}



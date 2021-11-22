import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { IAdvert } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit {
  private sub: Subscription
  advert: IAdvert


  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getAdvert(id);
      }
    );
  }

  getAdvert(id: number): void {
    this.userService.getAdvert(id)
      .pipe(delay(1000))
      .subscribe({
        next: (advert: IAdvert) => this.advert = advert,
        error: (err: string) => console.log('something went wrong: ', err)
      });
  }

}

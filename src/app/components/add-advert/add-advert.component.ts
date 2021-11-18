import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { IAdvert, IUser, Status } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sc-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit {

  advertForm: FormGroup;
  advert: IAdvert;
  success: boolean;
  buttonText: string = 'Publish';
  private errorMessage: String;
  currentUser: IUser;
  private sub: Subscription;



  country: any = [
    { name: 'Gauteng', cities: [{ name: 'JohannesburgGP', }, { 'name': 'Pretoria' }] },
    { name: 'Free State', cities: [{ name: 'JohannesburgFS', }, { 'name': 'Pretoria' }] },
    { name: 'Western Cape', cities: [{ name: 'JohannesburgWC', }, { 'name': 'Pretoria' }] },
    { name: 'North West', cities: [{ name: 'JohannesburgNW', }, { 'name': 'Pretoria' }] },
    { name: 'KZN', cities: [{ name: 'JohannesburgKZN', }, { 'name': 'Pretoria' }] }
  ]
  selectedProvince: any = { name: '', cities: [] };
  selectedCity: string = null;

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private stateService: StateService) { }

  ngOnInit(): void {
    if (!this.authenticationService.getLoggedInUser()) {
      this.router.navigate(['/login'])
    }

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        console.log('PARAM ID: ', id);
        this.getAdvert(id);
      }
    );

    this.advertForm = this.fb.group({
      headline: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      province: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      price: ['', [Validators.required, Validators.min(10000), Validators.max(100000000)]]
    });

    this.advertForm.get('province').valueChanges.subscribe(
      value => {
        this.selectedProvince = value;
        this.advertForm.get('city').reset();
        // console.log(this.selectedProvince) 
      }
    );

    this.currentUser = this.authenticationService.getLoggedInUser();



  }

  // saveAdvert() {
  //   if (this.advertForm.valid) {
  //     if (this.advertForm.dirty) {
  //       // const selectedProvince = this.selectedProvince.name;
  //       let p = { ...this.advert, ...this.advertForm.value };
  //       p.province = this.selectedProvince.name;
  //       p.userID = this.currentUser.id;
  //       p.images = ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg'];
  //       p.status = Status.live;
  //       this.success = true;
  //       this.buttonText = 'Publishing...';

  //       // console.log('submitted advert', p)
  //       // this.stateService.users[this.authenticationService.getLoggedInUser().id].adverts.push(p);
  //       this.userService.createAdvert(p)
  //         .pipe(delay(2000))
  //         .subscribe({
  //           next: () => this.onSaveComplete(),
  //           error: err => this.errorMessage = err
  //         });
  //     }
  //   } else {
  //     console.log('error')
  //     this.success = false
  //   }

  // }

  saveAdvert() {
    if (this.advertForm.valid) {
      if (this.advertForm.dirty) {
        let p = { ...this.advert, ...this.advertForm.value };
        p.province = this.selectedProvince.name;

        if (p.id === 0) {
          p.province = this.selectedProvince.name;
          p.userID = this.currentUser.id;
          p.images = ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg'];
          p.status = Status.live;
          this.success = true;
          this.buttonText = 'Publishing...';
          this.userService.createAdvert(p)
            .pipe(delay(2000))
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
        this.buttonText = 'Updating Salary...';
        this.userService.updateAdvert(p)
          .pipe(delay(2000))
          .subscribe({
            next: () => this.onSaveComplete(),
            error: (err:any) => console.log(err)
          })
      }
    } else {
      this.onSaveComplete();
    }
  }
}

getAdvert(id: number): void {
  //sets button text while fetching details
  this.buttonText = '...'

    //finalize callback sets the button text to either update || add salary based on whether the route is adding or updating a salary i.e 'id'
    this.userService.getAdvert(id)
    .pipe(delay(2000), finalize(() => this.buttonText = id === 0 ? 'Publish' : 'Update'))
    .subscribe({
      next: (advert: any) => this.displaySalary(advert),
      error: err => this.errorMessage = err
    });
}

displaySalary(advert: IAdvert): void {
  this.advert = advert;
  this.advertForm.patchValue({
    id: this.advert.id,
    headline: this.advert.headline,
    province: this.advert.province,
    city: this.advert.city,
    description: this.advert.description,
    price: this.advert.price,
  });
}

onSaveComplete() {
  this.advertForm.reset();
  this.router.navigate(['/my-adverts'])
}
}

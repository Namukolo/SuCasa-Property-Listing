import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { IAdvert } from 'src/app/models/user';
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

  }

  saveAdvert() {
    if (this.advertForm.valid) {
      if (this.advertForm.dirty) {
        // const selectedProvince = this.selectedProvince.name;
        let p = { ...this.advert, ...this.advertForm.value };
        p.province = this.selectedProvince.name;

        this.success = true;
        this.buttonText = 'Publishing...';

        // console.log('submitted advert', p)
        // this.stateService.users[this.authenticationService.getLoggedInUser().id].adverts.push(p);
        this.userService.createAdvert(p)
          .pipe(delay(2000))
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    } else {
      console.log('error')
      this.success = false
    }

  }

  onSaveComplete() {
    this.advertForm.reset();
    this.router.navigate(['/my-adverts'])
  }
}

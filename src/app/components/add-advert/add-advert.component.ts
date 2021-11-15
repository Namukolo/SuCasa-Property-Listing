import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'sc-add-advert',
  templateUrl: './add-advert.component.html',
  styleUrls: ['./add-advert.component.scss']
})
export class AddAdvertComponent implements OnInit {

  advertForm: FormGroup;

  country: any = [
    { name: 'Gauteng', cities: [{ name: 'JohannesburgGP', }, { 'name': 'Pretoria' }] },
    { name: 'Free State', cities: [{ name: 'JohannesburgFS', }, { 'name': 'Pretoria' }] },
    { name: 'Western Cape', cities: [{ name: 'JohannesburgWC', }, { 'name': 'Pretoria' }] },
    { name: 'North West', cities: [{ name: 'JohannesburgNW', }, { 'name': 'Pretoria' }] },
    { name: 'KZN', cities: [{ name: 'JohannesburgKZN', }, { 'name': 'Pretoria' }] }
  ]
  selectedProvince: any = { name: '', cities: [] };
  selectedCity: string = null;

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute,) { }

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
        console.log(this.selectedProvince) 
      }
    );

  }

  saveAdvert() {
    console.log(this.advertForm.value)
  }
}

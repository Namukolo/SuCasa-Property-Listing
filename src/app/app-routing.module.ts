import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdvertComponent } from './components/add-advert/add-advert.component';
import { AdvertDetailComponent } from './components/advert-detail/advert-detail.component';
import { AdvertListComponent } from './components/advert-list/advert-list.component';
import { AdvertManagementComponent } from './components/advert-management/advert-management.component';
import { AdvertsComponent } from './components/adverts/adverts.component';
import { FavouriteAdvertsComponent } from './components/favourite-adverts/favourite-adverts.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
  { path: 'for-sale', component: AdvertListComponent },
  { path: 'for-sale/:id', component: AdvertDetailComponent },
  { path: 'add-advert', component: AddAdvertComponent },
  { path: 'add-advert/:id/edit', component: AddAdvertComponent },
  { path: 'my-adverts', component: AdvertsComponent },
  { path: 'favourites', component: FavouriteAdvertsComponent },
  { path: 'advert-management', component: AdvertManagementComponent },
  {path: 'user-management', component: UserManagementComponent},
  { path: 'homepage', component: HomepageComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'my-seller-profile', component: SellerProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: '**', redirectTo: 'homepage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

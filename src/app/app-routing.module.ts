import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdvertComponent } from './components/add-advert/add-advert.component';
import { AdvertListComponent } from './components/advert-list/advert-list.component';
import { AdvertsComponent } from './components/adverts/adverts.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
// import { RouteGuard } from './shared/route.guard';

const routes: Routes = [
  { path: 'for-sale', component: AdvertListComponent },
  { path: 'add-advert', component: AddAdvertComponent },
  { path: 'add-advert/:id/edit', component: AddAdvertComponent },
  { path: 'my-adverts', component: AdvertsComponent },
  { path: 'homepage', component: HomepageComponent },
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserData } from './api/user-data'

import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Interceptor, localBackendProvider } from './shared/interceptor';
import { NavigationComponent } from './components/navigation/navigation.component';
// import { RouteGuard } from './shared/route.guard';
// import { JwtInterceptor } from './shared/jwt.interceptor';
// import { ErrorInterceptor } from './shared/error.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AdvertsComponent } from './components/adverts/adverts.component';
import { AddAdvertComponent } from './components/add-advert/add-advert.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AdvertListComponent } from './components/advert-list/advert-list.component';
import { AdvertDetailComponent } from './components/advert-detail/advert-detail.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { SearchComponent } from './components/search/search.component';
import { FeaturedAdvertsComponent } from './components/featured-adverts/featured-adverts.component';
import { CarouselModule, OwlRouterLinkDirective } from 'ngx-owl-carousel-o';
import { NoopAnimationPlayer } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { FavouriteAdvertsComponent } from './components/favourite-adverts/favourite-adverts.component';
import { AdvertManagementComponent } from './components/advert-management/advert-management.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomepageComponent,
    LoginComponent,
    NavigationComponent,
    AdvertsComponent,
    AddAdvertComponent,
    AdvertListComponent,
    AdvertDetailComponent,
    MyAccountComponent,
    SellerProfileComponent,
    SearchComponent,
    FeaturedAdvertsComponent,
    UserManagementComponent,
    FavouriteAdvertsComponent,
    AdvertManagementComponent,
    // OwlRouterLinkDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
      popoverClass: 'confirmationDialog',
      popoverTitle: 'This advert will be deleted',
      appendToBody: true,
      popoverMessage: 'Are you sure'
    }),
    HttpClientInMemoryWebApiModule.forRoot(UserData)
    
    // InMemoryWebApiModule.forRoot(UserData)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

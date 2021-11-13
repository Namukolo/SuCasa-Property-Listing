import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
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
import { Interceptor, localBackendProvider } from './shared/interceptor';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouteGuard } from './shared/route.guard';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { ErrorInterceptor } from './shared/error.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AdvertsComponent } from './components/adverts/adverts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomepageComponent,
    LoginComponent,
    NavigationComponent,
    AdvertsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // RouterModule.forRoot([
    //   { path: 'homepage', component: HomepageComponent },
    //   { path: 'login', component: LoginComponent },
    //   { path: 'registration', component: RegistrationComponent },
    //   { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    //   { path: '**', redirectTo: 'homepage', pathMatch: 'full' },
    // ]),
    InMemoryWebApiModule.forRoot(UserData)
  ],
  providers: [
    RouteGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    localBackendProvider,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {UserData} from './api/user-data'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(UserData)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

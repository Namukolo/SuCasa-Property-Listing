import { IUser, AccessLevel } from "../models/user";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, of, throwError } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { delay, dematerialize, finalize, materialize, mergeMap } from 'rxjs/operators';


@Injectable()
export class UserData implements InMemoryDbService {

    createDb(): { users: IUser[] } {
        const users: IUser[] = [
            {
                id: 1,
                forenames: 'Namukolo',
                surname: 'Mangwende',
                email: 'admin@gmail.com',
                password: 'Namukolo123',
                accessLevel: AccessLevel.admin,
                adverts: [

                ]
            },
            {
                id: 2,
                forenames: 'James',
                surname: 'Colin',
                email: 'james@gmail.com',
                password: 'James123',
                accessLevel: AccessLevel.user,
                adverts: [
                    {
                        id: 1,
                        headline: "Cool House",
                        location: 'Johannesburg',
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/02/fancy-houses2-feb122020.jpg']
                    }
                ]
            },
            {
                id: 3,
                forenames: 'Bongani',
                surname: 'Kunene',
                email: 'email@gmail.com',
                password: 'Bongani123',
                accessLevel: AccessLevel.user,
                adverts: [
                    {
                        id: 1,
                        headline: "2 bedroom townhouse for sale in Melrose North",
                        location: 'Johannesburg',
                        images: ['https://www.pamgolding.co.za/property-details/2-bedroom-townhouse-for-sale-melrose-north/hp1544263']
                    },
                    {
                        id: 2,
                        headline: "1 bedroom apartment for sale in Melrose Arch",
                        location: 'Johannesburg',
                        images: ['https://www.pamgolding.co.za/property-details/1-bedroom-apartment-for-sale-melrose-arch/hp1538650']
                    },
                    {
                        id: 3,
                        headline: "4 bedroom house for sale in Parktown North",
                        location: 'Johannesburg',
                        images: ['https://www.pamgolding.co.za/property-details/4-bedroom-house-for-sale-parktown-north/hp1514261']
                    }
                ]
            },
            {
                id: 4,
                forenames: 'Jane',
                surname: 'Doe',
                email: 'idontknow@gmail.com',
                password: 'Jane1234',
                accessLevel: AccessLevel.user,
                adverts: []
            },
            {
                id: 5,
                forenames: 'John',
                surname: 'Doe',
                email: 'metoo@gmail.com',
                password: 'John1234',
                accessLevel: AccessLevel.user,
                adverts: []
            }
        ];
        return { users };
    }
}

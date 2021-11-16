import { IUser, AccessLevel, Status } from "../models/user";
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
                        headline: "2 bedroom townhouse for sale in Melrose North",
                        province: 'Gauteng',
                        city: 'Johannesburg',
                        description: 'Some stuff',
                        price: 50,
                        status: Status.live,
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpga']
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
                        province: 'Gauteng',
                        city: 'Johannesburg',
                        description: 'Some stuff',
                        price: 50,
                        status: Status.live,
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
                    },
                    {
                        id: 2,
                        headline: "1 bedroom apartment for sale in Melrose Arch",
                        province: 'Gauteng',
                        city: 'Johannesburg',
                        description: 'Some stuff',
                        price: 50,
                        status: Status.live,
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
                    },
                    {
                        id: 3,
                        headline: "4 bedroom house for sale in Parktown North",
                        province: 'Gauteng',
                        city: 'Johannesburg',
                        description: 'Some stuff',
                        price: 50,
                        status: Status.live,
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
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

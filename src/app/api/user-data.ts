import { IUser, AccessLevel, Status } from "../models/user";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, of, throwError } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
// import { UserService } from '../services/user.service';
import { delay, dematerialize, finalize, materialize, mergeMap } from 'rxjs/operators';
import { RequestInfo } from "angular-in-memory-web-api";
import { EmailValidator } from "@angular/forms";


@Injectable()
export class UserData implements InMemoryDbService {
    constructor() { }

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
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
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


    //TRYING OUT INTERCEPTORS DIRECTLY ON IN MEMORY SERVICE
    //POST INTERCEPTOR
    post(reqInfo: any) {
        if (reqInfo.collectionName === 'authenticate')
            return this.authenticate(reqInfo)
        //  otherwise default response of In-memory DB
        return undefined
    }

    // private authenticate(reqInfo: any) {
    //     return reqInfo.utils.createResponse$(() => {

    //     })
    // }


    private authenticate(reqInfo: any) {

        // return an Observable response
        return reqInfo.utils.createResponse$(() => {
            let users: IUser[];
            users = this.createDb()?.users;
            // this.userService.getUsers().pipe().subscribe({
            //     next: users => users = users
            // });
            const { headers, url, req } = reqInfo
            const { email, password } = req.body;

            const filteredUsers = users.filter(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password)


            // if request username and password are correct
            if (filteredUsers.length) {
                let user = filteredUsers[0];
                let body = {
                    id: user.id,
                    email: user.email,
                    AccessLevel: AccessLevel.user,
                    forenames: user.forenames,
                    surname: user.surname,
                    accessLevel: user.accessLevel,
                    adverts: user.adverts,
                    token: 'fake-jwt-token'
                };
                //                     return of(new HttpResponse({ status: 200, body: body }));

                return {
                    status: 200,
                    headers,
                    url,
                    body: body
                }
            }


            //  otherwise return response with status code 401 (unauthorized)
            return {
                status: 401,
                headers,
                url,
                body: {}
            }
        })
    }


}
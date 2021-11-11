import { IUser, AccessLevel } from "../models/user";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable, of, throwError } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { delay, dematerialize, finalize, materialize, mergeMap } from 'rxjs/operators';


@Injectable()
export class UserData implements InMemoryDbService{

    createDb(): { users: IUser[] } {
        const users: IUser[] = [
            {
                id: 1,
                forenames: 'Namukolo',
                surname: 'Mangwende',
                email: 'somestuff@gmail.com',
                password: 'Namukolo123',
                accessLevel: AccessLevel.admin,
                adverts: [
    
                ]
            },
            {
                id: 2,
                forenames: 'James',
                surname: 'Colin',
                email: 'someotherstuff@gmail.com',
                password: 'James123',
                accessLevel: AccessLevel.user,
                adverts: [
                    {
                        id: 1,
                        headeline: "Cool House",
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
                        headeline: "Cool House",
                        location: 'Johannesburg',
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/02/fancy-houses2-feb122020.jpg']
                    },
                    {
                        id: 1,
                        headeline: "Cool House",
                        location: 'Johannesburg',
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/02/fancy-houses2-feb122020.jpg']
                    },
                    {
                        id: 1,
                        headeline: "Cool House",
                        location: 'Johannesburg',
                        images: ['https://www.homestratosphere.com/wp-content/uploads/2020/02/fancy-houses2-feb122020.jpg']
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

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //     return of(null).pipe(mergeMap(() => {

    //         // authenticate
    //         if (req.url.endsWith('/allUsers/authenticate') && req.method === 'POST') {
    //             // find if any user matches login credentials
    //             let filteredUsers = users.filter(user => {
    //                 return user.email === req.body.email && user.password === req.body.password;
    //             });

    //             if (filteredUsers.length) {
    //                 // if login details are valid return 200 OK with user details and fake jwt token
    //                 let user = filteredUsers[0];
    //                 let body = {
    //                     id: user.id,
    //                     email: user.email,
    //                     forenames: user.forenames,
    //                     surname: user.surname,
    //                     accessLevel: user.accessLevel,
    //                     token: 'fake-jwt-token'
    //                 };

    //                 return of(new HttpResponse({ status: 200, body: body }));
    //             } else {
    //                 // else return 400 bad request
    //                 return throwError({ error: { message: 'Username or password is incorrect' } });
    //             }
    //         }

    //         // pass through any requests not handled above
    //         return next.handle(req);

    //     }))
    //         // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    //         .pipe(materialize())
    //         .pipe(delay(500))
    //         .pipe(dematerialize());
    // }

}

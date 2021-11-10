import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError, of } from "rxjs";
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { delay, dematerialize, finalize, materialize, mergeMap } from 'rxjs/operators';
import { AccessLevel, IUser } from '../models/user';


@Injectable()
export class Interceptor implements HttpInterceptor {
    // constructor( INJECT YOUR AUTH SERVICE HERE )
    constructor(private userService: UserService) { }

    allUsers: IUser[] = [
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
                    location: 'Johannesburg',
                    images: ['https://www.homestratosphere.com/wp-content/uploads/2020/02/fancy-houses2-feb122020.jpg']
                }
            ]
        },
        {
            id: 3,
            forenames: 'Bongani',
            surname: 'Kunene',
            email: 'somewhichstuff@gmail.com',
            password: 'Bongani123',
            accessLevel: AccessLevel.user,
            adverts: [
                {
                    id: 1,
                    location: 'Johannesburg',
                    images: ['https://www.homestratosphere.com/wp-content/uploads/2020/02/fancy-houses2-feb122020.jpg']
                },
                {
                    id: 2,
                    location: 'Pretoria',
                    images: ['https://www.homestratosphere.com/wp-content/uploads/2020/02/fancy-houses2-feb122020.jpg']
                },
                {
                    id: 3,
                    location: 'Bloemfontein',
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

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (req.url.endsWith('/users/authenticate') && req.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = this.allUsers.filter(user => {
                    return user.email === req.body.email && user.password === req.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        email: user.email,
                        forenames: user.forenames,
                        surname: user.surname,
                        accessLevel: user.accessLevel,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            //register
            if (req.url.endsWith('/users/register') && req.method === 'POST') {

                // get new user object from post body
                let newUser = req.body;

                // validation
                let duplicateUser = this.allUsers.filter(user => { return user.email === newUser.email; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'An account with this email already exists' } });
                }

                // save new user
                newUser.id = this.allUsers.length + 1;
                this.allUsers.push(newUser);
                localStorage.setItem('users', JSON.stringify(this.allUsers));

                console.log('All users from register', this.allUsers)

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            //Get Users

            if (req.url.endsWith('/users') && req.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                // if (req.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: this.allUsers }));
                // } else {
                    // return 401 not authorised if token is null or invalid
                    // return throwError({ status: 401, error: { message: 'Unauthorised' } });
                // }
            }



            // pass through any requests not handled above
            return next.handle(req);

        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }

}

export let localBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
};
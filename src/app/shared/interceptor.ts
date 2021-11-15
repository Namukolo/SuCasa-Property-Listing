import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from "rxjs";
import { UserService } from '../services/user.service';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { AccessLevel, IAdvert, IUser } from '../models/user';
import { AdvertsComponent } from '../components/adverts/adverts.component';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    currentUser: IUser = this.authenticationService.getLoggedInUser() || null;

    allUsers: IUser[] = [
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
                    images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
                },
                {
                    id: 2,
                    headline: "1 bedroom apartment for sale in Melrose Arch",
                    province: 'Gauteng',
                    city: 'Johannesburg',
                    description: 'Some stuff',
                    price: 50,
                    images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
                },
                {
                    id: 3,
                    headline: "4 bedroom house for sale in Parktown North",
                    province: 'Gauteng',
                    city: 'Johannesburg',
                    description: 'Some stuff',
                    price: 50,
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


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let users: IUser[] = JSON.parse(localStorage.getItem('users')) || [...this.allUsers];

        return of(null).pipe(mergeMap(() => {

            // AUTHENTICATE --- LOGIN
            if (req.url.endsWith('/users/authenticate') && req.method === 'POST') {
                // finds users with given email and password - returns array
                let filteredUsers = users.filter(user => {
                    return user.email.toLowerCase() === req.body.email.toLowerCase() && user.password === req.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
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

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }


            //REGISTER --- REGISTRATION
            if (req.url.endsWith('/users/register') && req.method === 'POST') {

                // getting new user object from post body
                let input = req.body;
                let newUser = {
                    id: input.id,
                    email: input.email,
                    accessLevel: AccessLevel.user,
                    forenames: input.name,
                    surname: input.surname,
                    password: input.passwordGroup.password
                };

                // checking whether user with credentials (email) already exists
                let duplicateUser = users.filter(user => { return user.email.toLowerCase() === newUser.email.toLowerCase; }).length;
                if (duplicateUser) {
                    throw new HttpErrorResponse({
                        error: 'An account with this email already exists',
                        status: 500,
                        statusText: 'Warning',
                        url: 'users/register'
                    });
                }

                // save the new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond with 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            //GET USERS -- TODO (CURRENTLY UNFINISHED)
            if (req.url.endsWith('/users') && req.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: this.allUsers }));
            }


            //ADD ADVERT
            if (req.url.endsWith('/add-advert') && req.method === 'POST') {
                console.log('in the interceptor baby')
                let input = req.body;
                let advert = {
                    id: input.id,
                    headline: input.headline,
                    province: input.province,
                    city: input.city,
                    description: input.description,
                    price: input.price,
                    images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
                };

                advert.id = this.currentUser.adverts.length + 1;
                users[this.currentUser.id - 1].adverts.push(advert)
                console.log(users);
                localStorage.setItem('users', JSON.stringify(users))
                return of(new HttpResponse({ status: 200 }));
            }

            // pass through any requests not handled above
            return next.handle(req);

        }))
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
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from "rxjs";
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { delay, dematerialize, finalize, materialize, mergeMap } from 'rxjs/operators';
import { AccessLevel, IUser } from '../models/user';


@Injectable()
export class Interceptor implements HttpInterceptor {

    // constructor( INJECT YOUR AUTH SERVICE HERE )
    constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

    allUsers: IUser[] = [
        {
            id: 1,
            forenames: 'Namukolo',
            surname: 'Mangwende',
            email: 'stuff@gmail.com',
            password: '12345678',
            accessLevel: AccessLevel.admin,
            adverts: [

            ]
        },
    ];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // this.userService.getUsers().pipe().subscribe({
        //     next: salaries => {
        //         this.allUsers = salaries;
        //     },
        //     error: err => console.log(err)
        // });

        console.log('ALL USERS FROM INTEREPTOR', this.allUsers)

        return of(null).pipe(mergeMap(() => {

            // authenticate
            if(req.url.endsWith('/users/authenticate') && req.method === 'POST') {
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
                    console.log('I exist', filteredUsers)
                    console.log('\n NEW BODY:', body)

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(req);

        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }

    

        // console.log('here')

		// console.log('Hello Request: ', req);

		// // get your authorization header from the service
		// const authHeader = 'Bearer BLAHBLAHBLAHBLAH';

		// const authReq = req.clone({setHeaders: {'Authorization': authHeader}});

		// console.log('Modified request: ', authReq);

		// return next.handle(authReq);
	}

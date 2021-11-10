import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError, of } from "rxjs";
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { delay, dematerialize, finalize, materialize, mergeMap } from 'rxjs/operators';
import { AccessLevel, IUser } from '../models/user';


@Injectable()
export class Interceptor implements HttpInterceptor, OnInit {
    allUsers:IUser[];
    // constructor( INJECT YOUR AUTH SERVICE HERE )
    constructor( private userService: UserService) { }

    ngOnInit() {
        this.getAllUsers();
        console.log('ALL THE USERS FROM INTERCEPT', this.allUsers)
    }
    private getAllUsers(){
        this.userService.getUsers()
        .subscribe(data => this.allUsers = data);
    }
    // allUsers: IUser[] = [
    //     {
    //         id: 1,
    //         forenames: 'Namukolo',
    //         surname: 'Mangwende',
    //         email: 'stuff@gmail.com',
    //         password: '12345678',
    //         accessLevel: AccessLevel.admin,
    //         adverts: [

    //         ]
    //     },
    // ];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (req.url.endsWith('/allUsers/authenticate') && req.method === 'POST') {
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
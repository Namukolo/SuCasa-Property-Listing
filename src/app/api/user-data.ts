import { IUser, AccessLevel } from "../models/user";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';


export class UserData implements InMemoryDbService {

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
                email: 'idontknowwhoiam@gmail.com',
                password: 'Jane23',
                accessLevel: AccessLevel.user,
                adverts: []
            },
            {
                id: 5,
                forenames: 'John',
                surname: 'Doe',
                email: 'metoo@gmail.com',
                password: 'John123',
                accessLevel: AccessLevel.user,
                adverts: []
            }
        ];
        return { users };
    }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //     if (request.url.endsWith('/users/register') && request.method === 'POST') {
    //         // get new user object from post body
    //         let newUser = request.body;

    //         // validation
    //         let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
    //         if (duplicateUser) {
    //             return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
    //         }

    //         // save new user
    //         newUser.id = users.length + 1;
    //         users.push(newUser);
    //         localStorage.setItem('users', JSON.stringify(users));

    //         // respond 200 OK
    //         return of(new HttpResponse({ status: 200 }));
    //     }

    // }
}


import { IUser, AccessLevel, Status, IAdvert } from "../models/user";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class UserData implements InMemoryDbService {
    constructor() { }

    users: IUser[] = [
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
        },
        {
            id: 3,
            forenames: 'Bongani',
            surname: 'Kunene',
            email: 'email@gmail.com',
            password: 'Bongani123',
            accessLevel: AccessLevel.user,
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

    adverts: IAdvert[] = [
        {
            id: 1,
            userID: 3,
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
            userID: 3,
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
            userID: 3,
            headline: "4 bedroom house for sale in Parktown North",
            province: 'Gauteng',
            city: 'Johannesburg',
            description: 'Some stuff',
            price: 50,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 1,
            userID: 2,
            headline: "2 bedroom townhouse for sale in Melrose North",
            province: 'Gauteng',
            city: 'Johannesburg',
            description: 'Some stuff',
            price: 50,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        }
    ]

    createDb() {
        let users: IUser[] = [...this.users];
        let adverts: IAdvert[] = [...this.adverts]
        return { users, adverts };
        // return { users: [...this.users]}
    }


    //POST INTERCEPTOR
    post(reqInfo: any) {
        if (reqInfo.collectionName === 'authenticate')
            return this.authenticate(reqInfo)
        //  otherwise default response of In-memory DB
        return undefined
    }

    private authenticate(reqInfo: any) {

        // return an Observable response
        return reqInfo.utils.createResponse$(() => {
            let { users } = this.createDb();
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




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
            description: "North Facing, Sunny Private Garden Duplex Contact the agent for the full address.Excellent location, modern sunny north facing Townhouse!A perfect combination of neutral colours throughout, makes coming home and unburdening after a long day at the office or school, a wonderful respite.There are beautiful porcelain tiles in shared areas, the bathroom and kitchen, with gorgeous laminate flooring in the bedrooms. Window frames and sliding doors are aluminium and easy to maintain.",
            price: 2700000,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 2,
            userID: 3,
            headline: "1 bedroom apartment for sale in Melrose Arch",
            province: 'Gauteng',
            city: 'Johannesburg',
            description: 'Far Superior to anything else you have seen. Step into spectacular. Well-appointed on the 6th floor this designer apartment offers a host of unique features. Custom designed and decorated to compliment todays lifestyle. A fitted workstation makes working from home an absolute please. Grand scale, open plan living off the trend setting, chic kitchen. Gorgeous bedroom suite with an en suite bathroom which features a walk-in rain shower. The complex offers 24-hour concierge, excellent security, and full generator backup. The list of benefits is endless... come and see for yourself.',
            price: 3000000,
            status: Status.hiddden,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 3,
            userID: 3,
            headline: "4 bedroom house for sale in Parktown North",
            province: 'Gauteng',
            city: 'Johannesburg',
            description: 'Contemporary Executive two bed apartment.This exceptional north facing, two bed, two bathroom executive apartment, is conveniently located in the heart of Parktown North. Situated in a quiet position, in a smaller complex, the apartment offers a lock-up and go lifestyle suitable for a professional couple or for a commuter. The apartment is on the first floor and is a corner unit allowing for additional windows. The kitchen is open plan with contemporary finishes, there is allocation for three appliances and electric oven with gas hob (piped gas). The living area comprises a generous living and dining area and opens out onto a covered patio. The main bedroom is en-suite while the second bedroom has a separate bathroom. Good cupboard space throughout completes this sophisticated and immaculate apartment. There are two underground parking bays with lift access. A very well maintained and managed complex. The communal areas are pristine, with great security as well as a swimming pool. The apartment is fully furnished, the furniture can be purchased as a separate negotiation.',
            price:  1995000,
            status: Status.deleted,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 1,
            userID: 2,
            headline: "2 bedroom townhouse for sale in Melrose North",
            province: 'Gauteng',
            city: 'Johannesburg',
            description: 'This beautiful townhouse apartment is located in the upmarket suburb of Melrose in Johannesburg.The apartment is in a secure complex that is neatly tucked away from the hustle and bustle of the city.The unit has open plan living areas which lead onto the balcony. The lounge area has recently been tiled, with laminated floorin the bedrooms.The unit has 2 bedrooms and 1 full bathroom.Two bedrooms and full bathroom.The unit also comes with a double carport.The complex is within walking distance to popular parks, shops and malls.',
            price:  1260000,
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



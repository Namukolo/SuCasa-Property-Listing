
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

    country: any[] = [
        { id: 1, name: 'Gauteng', cities: [{ id: 1, name: 'Johannesburg', }, { id:2,'name': 'Pretoria' }] },
        { id: 2, name: 'Free State', cities: [{ id: 1,name: 'Bloemfontein', }, { id:2,'name': 'Welkom' }] },
        { id: 3, name: 'Western Cape', cities: [{ id: 1,name: 'Capetown', }, { id:2,'name': 'Stellenbosh' }] },
        { id: 4, name: 'North West', cities: [{ id: 1,name: 'Mahikeng', }, { id:2,'name': 'Klerksdorp' }] },
        { id: 5, name: 'KZN', cities: [{ id: 1,name: 'Durban', }, { id:2,'name': 'Richards Bay' }] }
    ]

    adverts: IAdvert[] = [
        {
            id: 1,
            userID: 3,
            headline: "3 Bedroom Townhouse for Sale in Montana Park",
            province: "Gauteng",
            city:  "Pretoria",
            description: "Cosmopolitan Projects NEWLY LAUNCHED DEVELOPMENT IN MONTANA.This Luxury Complex situated inside the well-known Zambezi Manor Lifestyle Estate in Montana, offers exclusive 3-bedroom, 2-bathroom townhouses including a garage and/or carport. This all-in-one Lifestyle Estate offers you the perfect family home from only R1.9M, estimate monthly repayment starting from R16 000. Qualifying income to qualify are R52 000 single or joint.Perfectly located, this estate gives you easy access to all major routes like the N1, N4 and N14 Highways.",
            price: 2700000,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 2,
            userID: 3,
            headline: "1 bedroom apartment for sale in Melrose Arch",
            province: "Gauteng",
            city: "Johannesburg",
            description: 'Far Superior to anything else you have seen. Step into spectacular. Well-appointed on the 6th floor this designer apartment offers a host of unique features. Custom designed and decorated to compliment todays lifestyle. A fitted workstation makes working from home an absolute please. Grand scale, open plan living off the trend setting, chic kitchen. Gorgeous bedroom suite with an en suite bathroom which features a walk-in rain shower. The complex offers 24-hour concierge, excellent security, and full generator backup. The list of benefits is endless... come and see for yourself.',
            price: 3000000,
            status: Status.hidden,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 3,
            userID: 3,
            headline: "3 Bedroom Apartment / Flat for Sale in Paradyskloof",
            province: "Western Cape",
            city: "Stellenbosch",
            description: 'Welcome to Stellenbosch 101Exclusive Mandate.This 3 Bedroom apartment is situated in the popular Stellenbosch 101 complex and is ideal for young professionals, students or investment purposes.Open plan kitchen and lounge that opens up to a balcony with the most astonishing mountain views.This is a well-maintained complex with communal pool and braai facilities.Close to Techno Park and Die Boord shopping centre.',
            price: 1799000,
            status: Status.deleted,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 4,
            userID: 2,
            headline: "2 Bedroom Apartment / Flat for Sale in Green Point",
            province: 'Western Cape',
            city: 'Capetown',
            description: 'Urban Park and Ocean Views. ON SHOW: SUNDAY 21 NOVEMBER 2021 from 14:00 - 17:00133 Main Road, Green Point. This perfectly positioned 78m2 apartment situated on Main Road consists of 2 bedrooms and 1.5 bathrooms. Separate galley with a large living and dining area complete with uninterrupted views over the Green Point Urban Park overlooking the ocean fromopen balcony.',
            price: 2450000,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 5,
            userID: 3,
            headline: "3 Bedroom House for Sale in Yellowwood Park",
            province: 'KZN',
            city: 'Durban',
            description: 'Stunning Family Home With Lots of Potential. Welcome to this well maintained and safe three bedroom home with CCV cameras, BIC, dazzling kitchen, open plan lounge and dining room, beautiful family bathroom and a modern en-suite with shower.There is a double garage with a remote control door and open parking up to 5 cars. The property has beautiful views and is fully fenced, it has an electric gate, aluminum and burglar guards on all windows. Two bedrooms have their own en-suite. It has big landscaped garden.Call now to view!',
            price: 1700000,
            status: Status.hidden,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 6,
            userID: 3,
            headline: "6 Bedroom House for Sale in Meer En See",
            province: 'KZN',
            city: 'Richards Bay',
            description: 'This stunning home is a luxurious double-storey contemporary residence situated in Meerensee, Richards Bay. Nestled in the well known street of Shad shoal, this home is conveniently situated to be close to everything. The home is designed for entertainment with expansive doors which open up the indoor/outdoor living area which consists of a lounge and opens onto a pool and sun lounging area overlooking the neatly manicured garden.',
            price: 4200000,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },

        {
            id: 7,
            userID: 3,
            headline: "4 Bedroom House for Sale in Flimieda",
            province: 'North West',
            city: 'Klerksdorp',
            description: 'Stunning family home spacious a must see.Open plan, with 4 bedrooms modern bathrooms, MES patio to lush garden sparkling pool .double garage and covered carport',
            price: 1300000,
            status: Status.hidden,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 8,
            userID: 2,
            headline: "2 bedroom townhouse for sale in Melrose North",
            province: 'North West',
            city: 'Mahikeng',
            description: 'This beautiful townhouse apartment is located in the upmarket suburb of Melrose in Johannesburg.The apartment is in a secure complex that is neatly tucked away from the hustle and bustle of the city.The unit has open plan living areas which lead onto the balcony. The lounge area has recently been tiled, with laminated floorin the bedrooms.The unit has 2 bedrooms and 1 full bathroom.Two bedrooms and full bathroom.The unit also comes with a double carport.The complex is within walking distance to popular parks, shops and malls.',
            price: 800000,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 9,
            userID: 2,
            headline: "2 bedroom townhouse for sale in Melrose North",
            province: 'Western Cape',
            city: 'Stellenbosh',
            description: 'This beautiful townhouse apartment is located in the upmarket suburb of Melrose in Johannesburg.The apartment is in a secure complex that is neatly tucked away from the hustle and bustle of the city.The unit has open plan living areas which lead onto the balcony. The lounge area has recently been tiled, with laminated floorin the bedrooms.The unit has 2 bedrooms and 1 full bathroom.Two bedrooms and full bathroom.The unit also comes with a double carport.The complex is within walking distance to popular parks, shops and malls.',
            price: 800000,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        }

    ]
    favourites: IAdvert[] = [
        {
            id: 1,
            userID: 3,
            headline: "3 Bedroom Townhouse for Sale in Montana Park",
            province: "Gauteng",
            city:  "Pretoria",
            description: "Cosmopolitan Projects NEWLY LAUNCHED DEVELOPMENT IN MONTANA.This Luxury Complex situated inside the well-known Zambezi Manor Lifestyle Estate in Montana, offers exclusive 3-bedroom, 2-bathroom townhouses including a garage and/or carport. This all-in-one Lifestyle Estate offers you the perfect family home from only R1.9M, estimate monthly repayment starting from R16 000. Qualifying income to qualify are R52 000 single or joint.Perfectly located, this estate gives you easy access to all major routes like the N1, N4 and N14 Highways.",
            price: 2700000,
            status: Status.live,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        },
        {
            id: 2,
            userID: 3,
            headline: "1 bedroom apartment for sale in Melrose Arch",
            province: "Gauteng",
            city: "Johannesburg",
            description: 'Far Superior to anything else you have seen. Step into spectacular. Well-appointed on the 6th floor this designer apartment offers a host of unique features. Custom designed and decorated to compliment todays lifestyle. A fitted workstation makes working from home an absolute please. Grand scale, open plan living off the trend setting, chic kitchen. Gorgeous bedroom suite with an en suite bathroom which features a walk-in rain shower. The complex offers 24-hour concierge, excellent security, and full generator backup. The list of benefits is endless... come and see for yourself.',
            price: 3000000,
            status: Status.hidden,
            images: ['https://www.homestratosphere.com/wp-content/uploads/2020/07/folding-house-by-ar-design-studio-Sept222020-min.jpg']
        }
    ]

    createDb() {
        let users: IUser[] = [...this.users];
        let adverts: IAdvert[] = [...this.adverts]
        let country: any[] = [...this.country]
        let favourites: IAdvert[] = [...this.favourites]
        return { users, adverts, country, favourites };
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



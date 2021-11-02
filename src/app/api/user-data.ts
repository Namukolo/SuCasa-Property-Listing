import { IUser, AccessLevel } from "../models/user";
import { InMemoryDbService } from 'angular-in-memory-web-api';


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
}

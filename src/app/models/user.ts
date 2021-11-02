export interface IUser{
    id:number,
    forenames: string,
    surname: string,
    email: string,
    password: string,
    accessLevel: AccessLevel,
    adverts: IAdvert[]
}

export enum AccessLevel{
    admin = 'ADMIN',
    user = 'USER'
}

export interface IAdvert{
    id:number,
    location: string,
    images: string[]
}
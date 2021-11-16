export interface IUser {
    id: number,
    forenames: string,
    surname: string,
    email: string,
    password: string,
    accessLevel: AccessLevel,
    adverts?: IAdvert[]
}

export enum AccessLevel {
    admin = 'ADMIN',
    user = 'USER',
    uu = 'UU'
}

export enum Status {
    live = 'LIVE',
    hiddden = 'HIDDEN',
    deleted = 'DELETED'

}

export interface IAdvert {
    id: number,
    headline: string,
    province: string,
    city: string,
    description: string,
    price: number,
    status: Status,
    images: string[]
}
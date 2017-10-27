import { IRestGalleryData } from './rest.galleries';
import { UserLinks } from '../user/user.model';
import { IRestResponse } from './rest.response';

export interface IRestUserAttributes {
    name: string;
    email: string;
    admin: number;
    token: string;
    created_at: string;
    updated_at: string;
}


export interface IRestUserData {
    type: string;
    id: string;
    links: UserLinks,
    attributes: IRestUserAttributes;
    relationships: IRestGalleryData[];
}


export interface IRestUserResponse extends IRestResponse {
    data: IRestUserData
}

import { Gallery } from '../galleries/gallery';
import { IRestUserData  } from '../rest/rest.user';

export interface IUserLogin {
    email: string;
    password: string;
}


export class UserLinks {
    self = '';
}


export class User {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    created_at: object;
    updated_at: object;
    galleries?: Gallery[];
    links: any;


    static transformRest(data: IRestUserData): User {
        let xform: User;
        xform = <User>{
            id: data.id,
            name: data.attributes.name,
            email: data.attributes.email,
            admin: !!data.attributes.admin,
            created_at: new Date(data.attributes.created_at),
            updated_at: new Date(data.attributes.updated_at),
            links: {
                self: data.links.self,
            }
        };

        return xform;
    }


    constructor(data?: User) {
        this.id = (data && data.id) || '';
        this.name = (data && data.name) || null;
        this.email = (data && data.email) || null;
        this.admin = (data && data.admin) || false;
        this.created_at = (data && data.created_at) || null;
        this.updated_at = (data && data.updated_at) || null;
        this.links = (data && data.links) || new UserLinks();
        // this.relationships = (data && data.relationships) || new GalleryRelationships();
    }


}

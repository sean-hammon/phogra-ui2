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
    token?: string;
    galleries?: Gallery[];
    links: any;


    static transformRest(data: IRestUserData): User {

        const xform = {
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

        return Object.assign(new User(), xform);
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

   /**
     * Returns an instance of User populated with the data in a
     * JSON string. Used when retrieving a serialized User from
     * SessionStorage.
     *
     * @param {string} json
     * @returns {User}
     */
    static parse(json: string): User {
        if (json) {
            const pojo = JSON.parse(json);
            return Object.assign(new User(), pojo);
        } else {
            return null;
        }
    }

}

import {IRestFileData} from './rest.files';

export interface IRestPhotoRelations {
    files?: any;
}

export interface IRestPhotoAttributes {
    title: string;
    slug: string;
    short_desc: string;
    long_desc: string;
    created_at: string;
    updated_at: string;
}

export interface IRestPhotoData {
    type: string;
    id: string;
    attributes: IRestPhotoAttributes;
    relationships: IRestPhotoRelations;
    links: any;
    included?: IRestFileData[];
}

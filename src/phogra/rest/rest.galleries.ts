import { IRestResponse } from './rest.response';

export interface IRestGalleryRelations {
    children?: any;
    photos?: any;
}

export interface IRestGalleryAttributes {
    parent_id: string;
    title: string;
    slug: string;
    node: string;
    description: string;
    featured: number;
    restricted: boolean;
    created_at: string;
    updated_at: string;
}

export interface IRestGalleryData {
    type: string;
    id: string;
    attributes: IRestGalleryAttributes;
    relationships: IRestGalleryRelations;
    links: any;
}

export interface IRestGalleryResponse extends IRestResponse{
    data: IRestGalleryData[]
}

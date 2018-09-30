import { IRestGalleryData } from '../rest/rest.galleries';

export interface IGalleryRelationships {
    children: string[];
}

export interface IGalleryLinks {
    self: string;
    photos: string;
    children: string;
    ui?: string;
}

class GalleryLinks implements IGalleryLinks {
    self = '';
    photos = '';
    children = '';
    ui = '';
}

class GalleryRelationships implements IGalleryRelationships {
    children: string[];
}

export class Gallery {
    id: string;
    parent_id: string;
    title: string;
    node: string;
    slug: string;
    path: string;
    description: string;
    featured: number;
    restricted: boolean;
    links: IGalleryLinks;
    relationships: IGalleryRelationships;
    created_at: Date;
    updated_at: Date;

    static transformRest(data: IRestGalleryData): Gallery {
        let xform: Gallery;
        xform = <Gallery>{
            id: data.id,
            parent_id: data.attributes.parent_id,
            title: data.attributes.title,
            slug: data.attributes.slug,
            node: data.attributes.node,
            description: data.attributes.description,
            restricted: data.attributes.restricted,
            featured: data.attributes.featured,
            links: {
                self: data.links.self,
                children: data.relationships.children.links.self,
                photos: data.relationships.photos.links.self
            },
            relationships: {
                children: data.relationships.children.data
            },
            created_at: new Date(data.attributes.created_at),
            updated_at: new Date(data.attributes.updated_at)
        };

        return Gallery.factory(xform);
    }


    static factory(data?: Gallery) {
        return {
            id: (data && data.id) || '',
            parent_id: (data && data.parent_id) || null,
            title: (data && data.title) || null,
            slug: (data && data.slug) || null,
            path: null,
            node: (data && data.node) || null,
            description: (data && data.description) || null,
            restricted: (data && data.restricted) || false,
            featured: (data && data.featured) || 0,
            created_at: (data && data.created_at) || null,
            updated_at: (data && data.updated_at) || null,
            links: (data && data.links) || new GalleryLinks(),
            relationships: (data && data.relationships) || new GalleryRelationships()
        };
    }

}

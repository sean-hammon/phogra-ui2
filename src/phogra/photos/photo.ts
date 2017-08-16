import {IFile} from "./file";
import {IRestPhotoData} from "../rest/rest.photos";
import {IRestFileData} from "../rest/rest.files";
import {File} from "./file";

export interface IPhotoLinks {
    self: string;
    ui: string;
}

export interface IPhotoFiles {
    original: IFile;
    thumb: IFile;
    soc: IFile;
    lofi?: IFile;
    hifi?: IFile;
    ulfi?: IFile;
}

export interface IPhoto {
    title: string;

    id?: string;
    slug?: string;
    short_desc?: string;
    long_desc?: string;
    created_at?: Date;
    updated_at?: Date;
    file_types?: string[];
    default_type?: string;
    links?: IPhotoLinks;
    files?: IPhotoFiles;
}

class PhotoLinks implements IPhotoLinks {
    self: string;
    ui: string;

    constructor(data?: IPhotoLinks) {
        this.self = data.self || '';
        this.ui = data.ui || '';
    }
}

class PhotoFiles implements IPhotoFiles {
    original: IFile;
    thumb: IFile;
    soc: IFile;
    lofi: IFile;
    hifi: IFile;
    ulfi: IFile;
}

export class Photo implements IPhoto {
    id: string;
    title: string;
    slug: string;
    short_desc: string;
    long_desc: string;
    file_types: string[];
    created_at: Date;
    updated_at: Date;
    links: IPhotoLinks;
    files: IPhotoFiles;

    constructor(data?:IPhoto) {
        this.id = data.id || '';
        this.title = data.title || '';
        this.slug = data.slug || '';
        this.short_desc = data.short_desc || '';
        this.long_desc = data.long_desc || '';
        this.file_types = data.file_types || [];
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null;
        this.links = data.links || new PhotoLinks();
        this.files = data.files || new PhotoFiles();
    }

    static transformRest(data: IRestPhotoData): IPhoto {
        let xform: IPhoto;
        xform = {
            id: data.id,
            title: data.attributes.title,
            slug: data.attributes.slug,
            short_desc: data.attributes.short_desc,
            long_desc: data.attributes.long_desc,
            file_types: data.relationships.files.data,
            links: {
                self: data.links.self,
                ui: '/photo/' + data.attributes.slug
            },
            created_at: new Date(data.attributes.created_at),
            updated_at: new Date(data.attributes.updated_at)
        };

        let photo = new Photo(xform);

        if (data.included) {
            data.included.forEach((item: IRestFileData) => {
                photo.files[item.attributes.type] = File.transformRest(item);
            });
        }

        return photo;
    }
}

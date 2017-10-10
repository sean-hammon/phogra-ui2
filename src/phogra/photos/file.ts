import {IRestFileData} from '../rest/rest.files';

export interface IFileLinks {
    self: string;
    src: string;
    image: string;
}

export interface IFileProperties {
    id: string;
    photo_id: string;
    type: string;
    height: number;
    width: number;
    offset: number;
    bytes: number;
    links: IFileLinks;
}

export interface IFile extends IFileProperties {
    cssUrl(): string;
    imgSrc(): string;
}

class FileLinks implements IFileLinks {
    self = '';
    src = '';
    image = '';
}

export class File implements IFile {
    id = '';
    photo_id: string;
    type: string;
    height: number;
    width: number;
    offset: number;
    bytes: number;
    links: IFileLinks;


    static transformRest(data: IRestFileData): IFile {
        let xform: IFileProperties;
        const links: IFileLinks = new FileLinks();
        links.self = data.links.self || undefined;
        links.src = data.links.src || undefined;
        links.image = data.links.image || undefined;
        xform = {
            id: data.id,
            photo_id: data.attributes.photo_id,
            type: data.attributes.type,
            height: data.attributes.height,
            width: data.attributes.width,
            //TODO: Update this value once the API catches up.
            offset: data.attributes.top,
            bytes: data.attributes.bytes,
            links: links
        };

        return new File(xform);
    }


    constructor(data: IFileProperties) {
        this.id = data.id || '';
        this.photo_id = data.photo_id || '';
        this.type = data.type || '';
        this.height = data.height || 0;
        this.width = data.width || 0;
        this.offset = data.offset;
        this.bytes = data.bytes || 0;
        this.links = data.links || new FileLinks();
    }

    cssUrl(): string {
        return 'url("' + (this.links.src || this.links.image) + '")';
    }

    imgSrc(): string {
        return this.links.src || this.links.image;
    }

}

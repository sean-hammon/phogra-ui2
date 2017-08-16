import {IRestFileData} from "../rest/rest.files";

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
    top: number;
    left: number;
    bytes: number;
    links: IFileLinks;
}

export interface IFile extends IFileProperties {
    cssUrl(): string;
    imgSrc(): string;
}

class FileLinks implements IFileLinks {
    self: string = '';
    src: string = '';
    image: string = '';
}

export class File implements IFile {
    id: string = '';
    photo_id: string;
    type: string;
    height: number;
    width: number;
    top: number;
    left: number;
    bytes: number;
    links: IFileLinks;

    constructor(data: IFileProperties) {
        this.id = data.id || '';
        this.photo_id = data.photo_id || '';
        this.type = data.type || '';
        this.height = data.height || 0;
        this.width = data.width || 0;
        this.top = data.top;
        this.left = data.left;
        this.bytes = data.bytes || 0;
        this.links = data.links || new FileLinks();
    }

    cssUrl(): string {
        return "url('" + (this.links.src || this.links.image) + "')";
    }

    imgSrc(): string {
        return this.links.src || this.links.image;
    }

    static transformRest(data: IRestFileData): IFile {
        let xform: IFileProperties;
        let links: IFileLinks = new FileLinks();
        links.self = data.links.self || undefined;
        links.src = data.links.src || undefined;
        links.image = data.links.image || undefined;
        xform = {
            id: data.id,
            photo_id: data.attributes.photo_id,
            type: data.attributes.type,
            height: data.attributes.height,
            width: data.attributes.width,
            top: data.attributes.top,
            left: data.attributes.left,
            bytes: data.attributes.bytes,
            links: links
        };

        return new File(xform);
    }
}

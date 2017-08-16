export interface IRestFileAttributes {
    photo_id: string;
    type: string;
    mimetype: string;
    height: number;
    width: number;
    top: number;
    left: number;
    bytes: number;
    href: string;
    created_at: Date;
    updated_at: Date;
}

export interface IRestFileData {
    type: string;
    id: string;
    attributes: IRestFileAttributes;
    links: any;
}
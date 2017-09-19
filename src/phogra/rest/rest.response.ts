export interface IRestLinks {
    self: string;
    related?: string;
}

export interface IRestResponse {
    links: IRestLinks;
    <T>(data: T): T | T[];
}

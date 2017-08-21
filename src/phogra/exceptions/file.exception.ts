import {IException} from "./exception";

export class FileException implements IException{

    public exception: string;

    constructor (message: string) {
        this.exception = message || "Ran into a problem while processing a file.";
    }
}

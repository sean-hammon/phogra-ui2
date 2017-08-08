import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Gallery } from "./gallery";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class GalleryService {

    private apiUrl = 'http://papi.dev';
    private apiEndpoint = "/galleries";

    constructor (
        private http: Http
    ){}

    fetchGalleries(): Observable<Gallery[]> {

        return this.http.get(this.apiUrl + this.apiEndpoint)
            .map(response => {
                let data = response.json().data;
                return data.map(item => Gallery.transformRest(item));
            });

    }
}

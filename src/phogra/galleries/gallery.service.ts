import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Gallery } from "./gallery";
import { Observable } from "rxjs/Observable";
import { environment } from "../../environments/environment";
import "rxjs/add/operator/map";
import { Photo } from "../photos/photo";

@Injectable()
export class GalleryService {

    private apiEndpoint = "/galleries";

    constructor (
        private http: Http
    ){}

    fetchGalleries(): Observable<Gallery[]> {

        return this.http.get(environment.apiBase + this.apiEndpoint)
            .map(response => {
                let data = response.json().data;
                return data.map(item => Gallery.transformRest(item));
            });

    }


    /**
     * Fetch the complete photo data for a given gallery.
     *
     * @param {Gallery} gallery
     *
     * @returns Photo[]
     */
    fetchGalleryPhotos(gallery: Gallery): Observable<Photo[]> {

        return this.http.get(gallery.links.photos + "?include=files")
            .map(response => {
                let data = response.json().data;
                return data.map(item => Photo.transformRest(item));
            });
    }
}

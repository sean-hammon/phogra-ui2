import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Gallery } from './gallery';
import { Photo } from '../photos/photo';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

@Injectable()
export class GalleryService {

    private apiEndpoint = '/galleries';
    private galleryResults: Observable<Gallery[]>;

    constructor (
        private http: Http
    ) {}

    fetchGalleries(): Observable<Gallery[]> {

        if (!this.galleryResults) {

            this.galleryResults = this.http.get(environment.apiBase + this.apiEndpoint)
                .map(response => {
                    let data = response.json().data;
                    return data.map(item => Gallery.transformRest(item));
                })
                .publishReplay(1)
                .refCount();

        }

        return this.galleryResults;
    }


    /**
     * Fetch the complete photo data for a given gallery.
     *
     * @param {Gallery} gallery
     *
     * @returns Photo[]
     */
    fetchGalleryPhotos(gallery: Gallery): Observable<Photo[]> {

        return this.http.get(gallery.links.photos + '?include=files')
            .map(response => {
                let data = response.json().data;
                return data.map(item => Photo.transformRest(item));
            });
    }
}

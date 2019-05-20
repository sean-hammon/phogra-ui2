import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery } from './gallery';
import { Photo } from 'phogra/photos/photo';
import { environment } from 'environments/environment';
import { IRestGalleryResponse } from 'phogra/rest/rest.galleries';
import { IRestPhotosResponse } from 'phogra/rest/rest.photos';
import { map, publishReplay, refCount } from 'rxjs/operators';

@Injectable()
export class GalleryService {

    private apiEndpoint = '/galleries';
    private galleryResults: Observable<Gallery[]>;

    constructor (
        private http: HttpClient
    ) {}

    fetchGalleries(): Observable<Gallery[]> {

        if (!this.galleryResults) {

            this.galleryResults = this.http.get<IRestGalleryResponse>(environment.apiBase + this.apiEndpoint)
                .pipe(
                    map((galleries: IRestGalleryResponse) => {
                        return galleries.data.map(item => Gallery.transformRest(item));
                    }),
                    publishReplay(1),
                    refCount()
                );

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

        return this.http.get<IRestPhotosResponse>(gallery.links.photos + '?include=files')
            .pipe(
                map((response: IRestPhotosResponse) => {
                    return response.data.map(item => Photo.transformRest(item));
                })
            );
    }
}

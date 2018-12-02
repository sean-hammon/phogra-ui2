import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { Gallery } from '../galleries/gallery';
import { IRestPhotosResponse } from '../rest/rest.photos';
import { Photo } from "./photo";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { FileException } from "../exceptions/file.exception";

import isEmpty from 'lodash/isEmpty';

@Injectable()
export class PhotoService {

    constructor(
        private http: HttpClient
    ) {}

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


    /**
     * Pre-load the photos so the animations work smoothly. I tried to use the
     * HTTP service first, but browsers seem to treat XHR and IMG requests
     * differently so it was not caching like I expected. Going this route
     * works like a charm...so far.
     *
     * @param {Photo} photo
     * @param {string} type
     *
     * @returns {any}
     */
    preloadFile(photo: Photo, type: string): Observable<Photo> {

        return Observable.create(observer => {

            let image = new Image();
            if (isEmpty(photo.files[type])){

                let exception = new FileException(`Photo ${photo.id} does not have a file with type '${type}'`);
                observer.error(exception);

            } else {
                //  Define these before setting the src attribute.
                image.onload = function imageLoaded() {
                    observer.next(photo);
                };
                image.onerror = function imageError() {
                    let exception = new FileException(photo.files[type].links.image + " did not load.");
                    observer.error(exception);
                };

                //  Pre-load
                image.src = photo.files[type].links.image;
            }

        });
    }


    preloadThumbs(photos: Photo[]) {

        let collection: Observable<Photo>[];

        collection = [];
        photos.forEach((photo: Photo) => {
            collection.push(this.preloadFile(photo, 'thumb')
                .pipe(
                    first()
                )
            );
        });

        return forkJoin(collection);

    }
}

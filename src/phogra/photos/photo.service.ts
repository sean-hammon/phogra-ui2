import { Photo } from './photo';
import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import { FileException } from 'phogra/exceptions/file.exception';

import isEmpty from 'lodash/isEmpty';
import { first } from 'rxjs/operators';

@Injectable()
export class PhotoService {

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

            const image = new Image();
            if (isEmpty(photo.files[type])) {

                const exception = new FileException(`Photo ${photo.id} does not have a file with type '${type}'`);
                observer.error(exception);

            } else {
                //  Define these before setting the src attribute.
                image.onload = function imageLoaded() {
                    observer.next(photo);
                };
                image.onerror = function imageError() {
                    const exception = new FileException(photo.files[type].links.image + ' did not load.');
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
                .pipe( first() )
            );
        });

        return forkJoin(collection);

    }
}

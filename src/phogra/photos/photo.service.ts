import { Photo } from "./photo";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { FileException } from "../exceptions/file.exception";

import isEmpty from 'lodash/isEmpty';

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
    preloadFile(photo:Photo, type: string): Observable<Photo> {

        return Observable.create(observer => {

            let image = new Image();
            if (isEmpty(photo.files[type])){

                let exception = new FileException(`Photo ${photo.id} does not have a file with type '${type}'`);
                observer.error(exception);

            } else {
                //  Define these before setting the src attribute.
                image.onload = function imageLoaded() {
                    observer.onNext(photo);
                    observer.onCompleted();
                };
                image.onerror = function imageError() {
                    let exception = new FileException(photo.files[type].links.image + " did not load.");
                    observer.error(exception);
                    observer.onCompleted();
                };

                //  Pre-load
                image.src = photo.files[type].links.image;
            }

        });
    }
}

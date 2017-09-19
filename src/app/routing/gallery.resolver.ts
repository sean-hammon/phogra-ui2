import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { GalleryService } from '../../phogra/galleries/gallery.service';
import { Store } from '@ngrx/store';
import { PRELOAD_BEGIN, PRELOAD_COMPLETE } from '../store/app.actions';
import { PhotoProvider } from '../../phogra/photos/photo.provider';
import { PhotoService } from '../../phogra/photos/photo.service';
import { Photo } from '../../phogra/photos/photo';

@Injectable()
export class GalleryResolver implements Resolve<Photo[]> {

    constructor(
        private store: Store<any>,
        private galleries: GalleryProvider,
        private galleryApi: GalleryService,
        private photos: PhotoProvider,
        private photoApi: PhotoService
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<Photo[]> {

        //  Make sure the spinner starts with each route change.
        this.store.dispatch({
            type: PRELOAD_BEGIN
        });

        const gallery = this.galleries.setById(route.url.pop().path);

        return  this.galleryApi.fetchGalleryPhotos(gallery)
            .switchMap((photos): Observable<Photo[]> => {

                this.photos.setPhotos(photos);
                const thumbs = this.photos.fetchThumbs(0, 12);
                return this.photoApi.preloadThumbs(thumbs);

            })
            .first();
    }
}

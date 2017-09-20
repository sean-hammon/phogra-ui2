import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { GalleryService } from '../../phogra/galleries/gallery.service';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { Gallery } from '../../phogra/galleries/gallery';
import { PhotoService } from '../../phogra/photos/photo.service';
import { PhotoProvider } from '../../phogra/photos/photo.provider';
import { Photo } from '../../phogra/photos/photo';
import { PRELOAD_BEGIN, PRELOAD_COMPLETE } from '../store/app.actions';

@Injectable()
export class PhotoResolver implements Resolve<boolean> {

    constructor(
        private store: Store<any>,
        private galleries: GalleryProvider,
        private galleryApi: GalleryService,
        private photoApi: PhotoService,
        private photos: PhotoProvider,
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const home_route =  route.url.length === 0;
        let photo_id = '',
            gallery_slug = '';

        //  Make sure the spinner starts with each route change.
        this.store.dispatch({
            type: PRELOAD_BEGIN
        });

        let gallery: Gallery;
        if (home_route) {

            gallery = this.galleries.setDefaultGallery();

        } else {

            //  If this isn't the home route, we don't necessarily know which
            //  gallery we are dealing with (external link directly to the photo URL.)
            photo_id = route.url.pop().path;
            gallery_slug = route.url.pop().path;
            gallery = this.galleries.setBySlug(gallery_slug);

        }

        return this.galleryApi.fetchGalleryPhotos(gallery)
            .switchMap((photos): Observable<Photo> => {
                this.photos.setPhotos(photos);

                let photo: Photo;
                if (home_route) {
                    photo = this.photos.random();
                } else {
                    photo = this.photos.fetchById(photo_id);
                }

                this.updateLinks(photo, gallery);

                return this.photoApi.preloadFile(photo, 'hifi');

            })
            .first();

    }


    private updateLinks(photo: Photo, gallery: Gallery) {

        photo.links.ui = this.assembleLink(photo.links.ui, gallery.path);
        photo.links.previous = this.assembleLink(photo.links.previous, gallery.path);
        photo.links.next = this.assembleLink(photo.links.next, gallery.path);

    }


    private assembleLink(url, gallery_path): string {

        if (!url) {
            return url;
        }

        let parts = url.split('/');
        parts.splice(parts.length - 1, 0, "in");
        parts.splice(parts.length - 1, 0, gallery_path.substr(1));

        return parts.join('/');
    }

}

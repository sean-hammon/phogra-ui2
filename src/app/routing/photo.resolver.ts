import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { GalleryService } from 'phogra/galleries/gallery.service';
import { GalleryProvider } from 'phogra/galleries/gallery.provider';
import { Gallery } from 'phogra/galleries/gallery';
import { PhotoService } from 'phogra/photos/photo.service';
import { PhotoProvider } from 'phogra/photos/photo.provider';
import { Photo } from 'phogra/photos/photo';

@Injectable()
export class PhotoResolver implements Resolve<boolean> {

    constructor(
        private galleries: GalleryProvider,
        private galleryApi: GalleryService,
        private photoApi: PhotoService,
        private photos: PhotoProvider,
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const home_route =  route.url.length === 0;
        let photo_id = '',
            gallery_slug = '';

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
            .flatMap((photos): Observable<Photo> => {
                this.photos.setPhotos(photos);

                let photo: Photo;
                if (home_route) {
                    photo = this.photos.random();
                } else {
                    photo = this.photos.fetchById(photo_id);
                }

                return this.photoApi.preloadFile(photo, 'hifi');

            })
            .first();

    }



}

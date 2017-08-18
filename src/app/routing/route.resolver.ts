import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Photo } from '../../phogra/photos/photo';
import { Gallery } from '../../phogra/galleries/gallery';
import { GalleryService } from '../../phogra/galleries/gallery.service';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { PhotoService } from '../../phogra/photos/photo.service';
import { PhotoProvider } from '../../phogra/photos/photo.provider';

import 'rxjs/add/operator/mergeMap';


@Injectable()
export class RouteResolver implements Resolve<boolean> {

    constructor(
        private galleryApi: GalleryService,
        private galleries: GalleryProvider,
        private photoApi: PhotoService,
        private photos: PhotoProvider
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        const baseUrl = route.parent.url[0] ? route.parent.url[0].path : 'default';

        return this.galleryApi.fetchGalleries()
            .map(galleries => {

                this.galleries.setGalleries(galleries);

                let gallery: Gallery;
                switch (baseUrl) {

                    case 'gallery':
                        gallery = this.galleries.fetchById(route.url.pop().path);
                        break;

                    default:
                        gallery = this.galleries.fetchDefaultGallery();
                }

                return gallery;
            })
            .mergeMap(gallery => this.galleryApi.fetchGalleryPhotos(gallery))
            .switchMap(photos => {

                this.photos.setPhotos(photos);

                let photo: Photo;
                switch (baseUrl) {

                    case 'photo':
                        // eventually
                        break;

                    default:
                        photo = this.photos.random();
                        return this.photoApi.preloadFile(photo, 'hifi');
                }

            })

    }
}

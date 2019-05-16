import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { GalleryService } from '../../phogra/galleries/gallery.service';
import { PhotoProvider } from '../../phogra/photos/photo.provider';
import { PhotoService } from '../../phogra/photos/photo.service';
import { Photo } from '../../phogra/photos/photo';
import { ThumbCalculator } from '../gallery/thumb/ThumbCalculator';
import {take} from 'rxjs/operators';

@Injectable()
export class GalleryResolver implements Resolve<Photo[]> {

    constructor(
        private galleries: GalleryProvider,
        private galleryApi: GalleryService,
        private photos: PhotoProvider,
        private photoApi: PhotoService,
        private thumbCalculator: ThumbCalculator
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<Photo[]> {

        const gallery_id = route.url.pop().path;
        const gallery = this.galleries.setById(gallery_id);

        return this.galleryApi.fetchGalleryPhotos(gallery)
            .pipe(
                take(1)
            );

    }
}

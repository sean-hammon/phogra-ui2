import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { GalleryService } from '../../phogra/galleries/gallery.service';
import { Store } from '@ngrx/store';
import {
    AppPreloadBeginAction, ThumbsAppendAction, ThumbsInitializePageAction,
    ThumbsResetAction
} from '../store/app.actions';
import { PhotoProvider } from '../../phogra/photos/photo.provider';
import { PhotoService } from '../../phogra/photos/photo.service';
import { Photo } from '../../phogra/photos/photo';
import { ThumbCalculator } from '../gallery/thumb/ThumbCalculator';
import { thumbPages } from '../store/app.state';
import 'rxjs/add/operator/take';

@Injectable()
export class GalleryResolver implements Resolve<Photo[]> {

    constructor(
        private store: Store<any>,
        private galleries: GalleryProvider,
        private galleryApi: GalleryService,
        private photos: PhotoProvider,
        private photoApi: PhotoService,
        private ThumbCalculator: ThumbCalculator
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<Photo[]> {

        //  Make sure the spinner starts with each route change.
        this.store.dispatch(new AppPreloadBeginAction());

        const gallery_id = route.url.pop().path;
        const gallery = this.galleries.setById(gallery_id);

        this.store.dispatch(new ThumbsResetAction());

        return this.galleryApi.fetchGalleryPhotos(gallery)
            .flatMap((photos: Photo[]) => {

                this.photos.setPhotos(photos);
                return this.store.select(thumbPages);

            })
            .take(1)
            .flatMap((thumbPages: any) => {

                let current_page;
                if (typeof thumbPages[gallery_id] !== 'undefined') {
                    current_page = thumbPages[gallery_id];
                } else {
                    current_page = 0;
                    this.store.dispatch(new ThumbsInitializePageAction(gallery_id));
                }

                return this.ThumbCalculator.fetchPageRange(0, current_page);

            })
            .do(thumbs => {
                this.store.dispatch(new ThumbsAppendAction(thumbs));
            })
            .first();

    }
}

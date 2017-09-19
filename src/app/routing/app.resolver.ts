import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Photo } from '../../phogra/photos/photo';
import { Gallery } from '../../phogra/galleries/gallery';
import { GalleryService } from '../../phogra/galleries/gallery.service';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { PhotoService } from '../../phogra/photos/photo.service';
import { PhotoProvider } from '../../phogra/photos/photo.provider';

import { PRELOAD_BEGIN, PRELOAD_COMPLETE } from '../store/app.actions';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';


@Injectable()
export class AppResolver implements Resolve<boolean> {

    constructor(
        private store: Store<any>,
        private galleryApi: GalleryService,
        private galleries: GalleryProvider,
        private photoApi: PhotoService,
        private photos: PhotoProvider
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        this.store.dispatch({
            type: PRELOAD_BEGIN
        });

        return this.galleryApi.fetchGalleries()
            .map(galleries => {

                this.galleries.setGalleries(galleries);
                return true;

            });


    }
}

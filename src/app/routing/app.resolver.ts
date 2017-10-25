import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { GalleryService } from '../../phogra/galleries/gallery.service';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';

import { AppPreloadBeginAction } from '../store/app.actions';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';


@Injectable()
export class AppResolver implements Resolve<boolean> {

    constructor(
        private store: Store<any>,
        private galleryApi: GalleryService,
        private galleries: GalleryProvider,
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        this.store.dispatch(new AppPreloadBeginAction());

        return this.galleryApi.fetchGalleries()
            .map(galleries => {

                this.galleries.setGalleries(galleries);
                return true;

            });


    }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { GalleryService } from 'phogra/galleries/gallery.service';
import { GalleryProvider } from 'phogra/galleries/gallery.provider';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';


@Injectable()
export class AppResolver implements Resolve<boolean> {

    constructor(
        private galleryApi: GalleryService,
        private galleries: GalleryProvider,
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        return this.galleryApi.fetchGalleries()
            .map(galleries => {

                this.galleries.setGalleries(galleries);
                return true;

            });


    }
}

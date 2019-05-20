import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { GalleryService } from 'phogra/galleries/gallery.service';
import { GalleryProvider } from 'phogra/galleries/gallery.provider';
import {map} from 'rxjs/operators';

@Injectable()
export class AppResolver implements Resolve<boolean> {

    constructor(
        private galleryApi: GalleryService,
        private galleries: GalleryProvider,
    ) { }


    resolve(route: ActivatedRouteSnapshot): Observable<any> {

        return this.galleryApi.fetchGalleries()
            .pipe(
                map(galleries => {
                    this.galleries.setGalleries(galleries);
                    return true;
                })
            );

    }
}

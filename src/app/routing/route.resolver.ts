import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { Photo } from "../../phogra/photos/photo";
import { Gallery } from "../../phogra/galleries/gallery";
import { GalleryService } from "../../phogra/galleries/gallery.service";
import { GalleryProvider } from "../../phogra/galleries/gallery.provider";
import { PhotoProvider } from "../../phogra/photos/photo.provider";
import { FETCH_GALLERY_PHOTOS_SUCCESS, SET_CURRENT_GALLERY, SET_CURRENT_PHOTO } from "../store/app.actions";

import "rxjs/add/operator/mergeMap";


@Injectable()
export class RouteResolver implements Resolve<boolean>{

    constructor(
        private store: Store<any>,
        private galleryApi: GalleryService,
        private galleries: GalleryProvider,
        private photos: PhotoProvider
    ) { }


    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        let baseUrl = route.parent.url[0] ? route.parent.url[0].path : 'default';

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

                this.store.dispatch({
                    type: SET_CURRENT_GALLERY,
                    payload: gallery
                });

                return gallery;
            })
            .mergeMap(gallery => this.galleryApi.fetchGalleryPhotos(gallery))
            .map(photos => {


                this.store.dispatch({
                    type: FETCH_GALLERY_PHOTOS_SUCCESS,
                    payload: photos
                });

                let photo: Photo;
                switch (baseUrl) {

                    case 'photo':
                        //eventually
                        break;

                    default:
                        photo = this.photos.random();
                        this.store.dispatch({
                            type: SET_CURRENT_PHOTO,
                            payload: photo
                        });
                }


                return photo;

            })

    }
}

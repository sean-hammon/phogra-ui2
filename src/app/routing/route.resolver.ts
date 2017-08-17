import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Photo } from "../../phogra/photos/photo";
import { Gallery } from "../../phogra/galleries/gallery";
import { GalleryProvider } from "../../phogra/galleries/gallery.provider";
import { galleryState } from "../store/app.state";
import { Observable } from "rxjs/Observable";


@Injectable()
export class RouteResolver implements Resolve<boolean>{

    constructor(
        private store: Store<any>,
        private galleries: GalleryProvider
    ) { }


    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

        let photo: Photo;
        let gallery: Gallery;

        let baseUrl = route.parent.url[0].path || 'default';
        switch(baseUrl) {

            case 'photo':
                break;

            default:
                gallery = this.galleries.fetchDefaultGallery();
                console.log(gallery);

        };
        return new Promise((resolve, reject) => {


            resolve(true);
        });

    }
}

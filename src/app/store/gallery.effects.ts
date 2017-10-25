import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { GalleryService } from '../../phogra/galleries/gallery.service';
import { ActionNames } from './app.actions';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class GalleryEffects {

    @Effect()
    fetchGalleries$ = this.actions$
        .ofType(ActionNames.FETCH_GALLERIES)
        .flatMap(
            action => {
                return this.api.fetchGalleries()
                    .map(galleries => ({type: ActionNames.FETCH_GALLERIES_SUCCESS, payload: galleries}))
                    .catch(() => Observable.of({type: ActionNames.FETCH_GALLERIES_ERROR}))
            }
        );


    @Effect()
    fetchGalleryPhotos$ = this.actions$
        .ofType(ActionNames.FETCH_GALLERY_PHOTOS)
        .map(toPayload)
        .flatMap(
            gallery => {
                return this.api.fetchGalleryPhotos(gallery)
                    .map(photos => ({type: ActionNames.FETCH_GALLERY_PHOTOS_SUCCESS, payload: photos}))
                    .catch(() => Observable.of({type: ActionNames.FETCH_GALLERY_PHOTOS_ERROR}))
            }
        );


    constructor (
        private actions$: Actions,
        private api: GalleryService
    ) {}

}

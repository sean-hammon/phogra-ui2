import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { GalleryService } from "../../phogra/galleries/gallery.service";
import { FETCH_GALLERIES, FETCH_GALLERIES_ERROR, FETCH_GALLERIES_SUCCESS } from "./app.actions";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

@Injectable()
export class GalleryEffects {

    constructor (
        private actions$: Actions,
        private api: GalleryService
    ) {}

    @Effect()
    fetchGalleries$ = this.actions$
        .ofType(FETCH_GALLERIES)
        .switchMap(
            action => {
                return this.api.fetchGalleries()
                    .map(galleries => ({type: FETCH_GALLERIES_SUCCESS, payload: galleries}))
                    .catch(() => Observable.of({type: FETCH_GALLERIES_ERROR}))
            }
        );
}

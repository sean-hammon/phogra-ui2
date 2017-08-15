import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { GalleryService } from "../../phogra/galleries/gallery.service";
import { GET_GALLERIES, GET_GALLERIES_ERROR, GET_GALLERIES_SUCCESS } from "./app.actions";
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
    getGalleries$ = this.actions$
        .ofType(GET_GALLERIES)
        .switchMap(
            action => this.api.fetchGalleries()
                .map(galleries => ({type: GET_GALLERIES_SUCCESS, payload: galleries}))
                .catch(() => Observable.of({type: GET_GALLERIES_ERROR}))
        )
}

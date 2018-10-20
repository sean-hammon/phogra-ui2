import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';

import { catchError, map, switchMap } from 'rxjs/operators';

import * as galleryActions  from './gallery.actions';
import { GalleryService } from '../../galleries/gallery.service';

@Injectable()
export class GalleryEffects {

    constructor(
        private actions$: Actions,
        private galleryApi: GalleryService
    ) {}

    @Effect()
    loadGalleries$ = this.actions$.ofType(galleryActions.LOAD_GALLERIES)
        .pipe(
            switchMap(() => {
                return this.galleryApi.fetchGalleries()
                    .pipe(
                        map(galleries => new galleryActions.LoadGalleriesSuccess(galleries)),
                        catchError((error: HttpErrorResponse) => of(new galleryActions.LoadGalleriesFail(error)))
                    )
            })
        );

    
}

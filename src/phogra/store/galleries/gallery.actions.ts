import { HttpErrorResponse } from '@angular/common/http';
import { Action } from "@ngrx/store";
import { Gallery } from '../../galleries/gallery';

export const LOAD_GALLERIES = '[Phogra] Load Galleries';
export const LOAD_GALLERIES_SUCCESS = '[Phogra] Load Success';
export const LOAD_GALLERIES_FAIL = '[Phogra] Load Fail';

export class LoadGalleries implements Action {
    readonly type = LOAD_GALLERIES;
}

export class LoadGalleriesSuccess implements Action {
    readonly type = LOAD_GALLERIES_SUCCESS;
    constructor(public payload: Gallery[]) {};
}

export class LoadGalleriesFail implements Action {
    readonly type = LOAD_GALLERIES_FAIL;
    constructor(public payload: HttpErrorResponse) {};
}

export type GalleryActions = LoadGalleries | LoadGalleriesFail | LoadGalleriesSuccess;

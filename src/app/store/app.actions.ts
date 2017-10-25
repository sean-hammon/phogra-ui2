import { Gallery } from '../../phogra/galleries/gallery';
import { Photo } from '../../phogra/photos/photo';

export interface ReducerAction {
    type: string;
    payload?: any;
}

export const ActionNames = {
    TOGGLE_MENU: 'TOGGLE_MENU',
    PRELOAD_BEGIN: 'PRELOAD_BEGIN',
    PRELOAD_COMPLETE: 'PRELOAD_COMPLETE',

    SET_GALLERIES: 'SET_GALLERIES',
    SET_CURRENT_GALLERY: 'SET_CURRENT_GALLERY',

    SET_PHOTOS: 'SET_PHOTOS',
    SET_CURRENT_PHOTO: 'SET_CURRENT_PHOTO',
    TOGGLE_ZOOM: 'TOGGLE_ZOOM',

    RESET_THUMBS: 'RESET_THUMBS',
    APPEND_THUMBS: 'APPEND_THUMBS',
    INITIALIZE_THUMB_PAGE: 'INITIALIZE_THUMB_PAGE',
    INCREMENT_THUMB_PAGE: 'INCREMENT_THUMB_PAGE',

    FETCH_GALLERIES: 'FETCH_GALLERIES',
    FETCH_GALLERIES_SUCCESS: 'FETCH_GALLERIES_SUCCESS',
    FETCH_GALLERIES_ERROR: 'FETCH_GALLERIES_ERROR',

    FETCH_GALLERY_PHOTOS: 'FETCH_GALLERY_PHOTOS',
    FETCH_GALLERY_PHOTOS_SUCCESS: 'FETCH_GALLERY_PHOTOS_SUCCESS',
    FETCH_GALLERY_PHOTOS_ERROR: 'FETCH_GALLERY_PHOTOS_ERROR',
};

export class AppToogleMenuAction implements ReducerAction {
    readonly type = ActionNames.TOGGLE_MENU;
}

export class AppPreloadBeginAction implements ReducerAction {
    readonly type = ActionNames.PRELOAD_BEGIN;
}

export class AppPreloadCompleteAction implements ReducerAction {
    readonly type = ActionNames.PRELOAD_COMPLETE;
}

export class GalleriesSetAction implements ReducerAction {
    readonly type = ActionNames.SET_GALLERIES;
    constructor (public payload: Gallery[]) {}
}

export class GalleriesSetCurrentAction implements ReducerAction {
    readonly type = ActionNames.SET_CURRENT_GALLERY;
    constructor (public payload: Gallery) {}
}

export class PhotosSetAction implements ReducerAction {
    readonly type = ActionNames.SET_PHOTOS;
    constructor (public payload: Photo[]) {}
}

export class PhotosSetCurrentAction implements ReducerAction {
    readonly type = ActionNames.SET_CURRENT_PHOTO;
    constructor (public payload: Photo) {}
}

export class PhotosToggleZoom implements ReducerAction {
    readonly type = ActionNames.TOGGLE_ZOOM;
}

export class ThumbsResetAction implements ReducerAction {
    readonly type = ActionNames.RESET_THUMBS;
}

export class ThumbsAppendAction implements ReducerAction {
    readonly type = ActionNames.APPEND_THUMBS;
    constructor (public payload: Photo[]) {}
}

export class ThumbsIncrementPageAction implements ReducerAction{
    readonly type = ActionNames.INCREMENT_THUMB_PAGE;
    constructor(public payload: string){}
}

export class ThumbsInitializePageAction implements ReducerAction {
    readonly type = ActionNames.INITIALIZE_THUMB_PAGE;
    constructor(public payload: string) {}
}

export class FetchGalleriesAction implements ReducerAction {
    readonly type = ActionNames.FETCH_GALLERIES;
}

export class FetchGalleriesSuccessAction implements ReducerAction {
    readonly type = ActionNames.FETCH_GALLERIES_SUCCESS;
}

export class FetchGalleriesErrorAction implements ReducerAction {
    readonly type = ActionNames.FETCH_GALLERIES_ERROR;
}

export class FetchGalleryPhotosAction implements ReducerAction {
    readonly type = ActionNames.FETCH_GALLERIES;
}

export class FetchGalleryPhotosSuccessAction implements ReducerAction {
    readonly type = ActionNames.FETCH_GALLERIES_SUCCESS;
}

export class FetchGalleryPhotosErrorAction implements ReducerAction {
    readonly type = ActionNames.FETCH_GALLERIES_ERROR;
}

export interface ReducerAction {
    type: string;
    payload?: any;
}

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const PRELOAD_BEGIN = 'PRELOAD_BEGIN';
export const PRELOAD_COMPLETE = 'PRELOAD_COMPLETE';

export const SET_GALLERIES = 'SET_GALLERIES';
export const SET_PHOTOS = 'SET_PHOTOS';
export const RESET_THUMBS = 'RESET_THUMBS';
export const APPEND_THUMBS = 'APPEND_THUMBS';

export const SET_CURRENT_GALLERY = 'SET_CURRENT_GALLERY';
export const SET_CURRENT_PHOTO = 'SET_CURRENT_PHOTO';
export const TOGGLE_ZOOM = 'TOGGLE_ZOOM';

export const FETCH_GALLERIES = 'FETCH_GALLERIES';
export const FETCH_GALLERIES_SUCCESS = 'FETCH_GALLERIES_SUCCESS';
export const FETCH_GALLERIES_ERROR = 'FETCH_GALLERIES_ERROR';

export const FETCH_GALLERY_PHOTOS = 'FETCH_GALLERY_PHOTOS';
export const FETCH_GALLERY_PHOTOS_SUCCESS = 'FETCH_GALLERY_PHOTOS_SUCCESS';
export const FETCH_GALLERY_PHOTOS_ERROR = 'FETCH_GALLERY_PHOTOS_ERROR';

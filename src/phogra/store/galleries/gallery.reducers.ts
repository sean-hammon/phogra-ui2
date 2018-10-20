import * as galleryState from './gallery.actions';
import { Gallery } from '../../galleries/gallery';

export interface GalleryState {
    galleries: Gallery[],
    loading: boolean,
    loaded: boolean,
    current: Gallery

}

export const initialState: GalleryState = {
    galleries: [],
    loading: false,
    loaded: false,
    current: null
};

export function reducer(
    state = initialState,
    action: galleryState.GalleryActions
):GalleryState {

    switch (action.type) {

        case galleryState.LOAD_GALLERIES:
            return {...state, loading: true};

        case galleryState.LOAD_GALLERIES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                galleries: action.payload
            };

        case galleryState.LOAD_GALLERIES_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false
            };

        default:
            return state;

    }

}

export const getGalleries = (state: GalleryState) => state.galleries;
export const getGalleriesLoading = (state: GalleryState) => state.loading;
export const getGalleriesLoaded = (state: GalleryState) => state.loaded;

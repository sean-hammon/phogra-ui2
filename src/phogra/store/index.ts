import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as galleryStore from './galleries/gallery.reducers';

export interface PhograState {
    galleries: galleryStore.GalleryState
}

export const reducers: ActionReducerMap<PhograState> = {
    galleries: galleryStore.reducer
};

export const getPhograState = createFeatureSelector<PhograState>('phogra');
export const getGalleriesState = createSelector(
    getPhograState,
    (state: PhograState) => state.galleries
);
export const getGalleries = createSelector(
    getGalleriesState, galleryStore.getGalleries
);
export const getGalleriesLoading = createSelector(
    getGalleriesState, galleryStore.getGalleriesLoading
);
export const getGalleriesLoaded = createSelector(
    getGalleriesState, galleryStore.getGalleriesLoaded
);

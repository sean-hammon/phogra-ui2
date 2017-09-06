import { Gallery } from '../../phogra/galleries/gallery';
import { Photo } from '../../phogra/photos/photo';

export interface AppState {
    loading: boolean;
    load_complete: boolean;
    error: string;
    menuOpen: boolean;
    breadcrumbs: any[];
    current_photo: any;
    current_gallery: any;
    galleries: Gallery[];
    photos: Photo[];
    thumbs: Photo[];
}

export const initialState: AppState = {
    loading: false,
    load_complete: true,
    error: null,
    menuOpen: false,
    breadcrumbs: [],
    current_photo: {},
    current_gallery: {},
    galleries: [],
    photos: [],
    thumbs: []
};

export const initialStats = {
    photo_count: 0,
    thumb_count: 0
};

interface AppStore {
    appState: AppState;
}

export const galleryState = (state: AppStore) => state.appState.galleries;
export const currentGallery = (state: AppStore) => state.appState.current_gallery;
export const photosState = (state: AppStore) => state.appState.photos;
export const currentPhoto = (state: AppStore) => state.appState.current_photo;
export const menuState = (state: AppStore) => state.appState.menuOpen;
export const loadingState = (state: AppStore) => state.appState.loading;
export const loadComplete = (state: AppStore) => state.appState.load_complete;
export const thumbsState = (state: AppStore) => state.appState.thumbs;
export const topBarStats = (state: AppStore) => {
    return {
        'photo_count': state.appState.photos.length,
        'thumb_count': state.appState.thumbs.length,
    }
};

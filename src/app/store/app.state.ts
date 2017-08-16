import { Gallery } from "../../phogra/galleries/gallery";

export interface AppState
{
	loading: boolean;
	error: string;
	menuOpen: boolean;
	breadcrumbs: any[];
	current_photo: any;
	current_gallery: any;
	galleries: Gallery[];
	photos: any;

}

export const initialState: AppState = {
    loading: true,
    error: null,
    menuOpen: false,
    breadcrumbs: [],
    current_photo: {},
    current_gallery: {},
    galleries: [],
    photos: []
};

interface AppStore {
    appState: AppState;
}

export const galleryState = (state: AppStore) => state.appState.galleries;
export const currentGallery = (state: AppStore) => state.appState.current_gallery;
export const photosState = (state: AppStore) => state.appState.photos;
export const currentPhoto = (state: AppStore) => state.appState.current_photo;
export const menuState = (state: AppStore) => state.appState.menuOpen;

import { Gallery } from '../../phogra/galleries/gallery';
import { Photo } from '../../phogra/photos/photo';

export interface Breadcrumbs {
    history: Gallery[];
    next: Gallery[];
}

export interface AppState {
    galleries: Gallery[];
    current: {
        gallery: Gallery,
        photo: Photo
    };
    breadcrumbs: Breadcrumbs;
}

export const initialState: AppState = {
    galleries: [],
    current: {
        gallery: null,
        photo: null
    },
    breadcrumbs: {
        history: [],
        next: []
    }
};



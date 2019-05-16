import { Store, StoreConfig } from '@datorama/akita';
import { Gallery } from 'phogra/galleries/gallery';
import { Photo } from 'phogra/photos/photo';

export interface SessionState {
    loading: boolean;
    load_complete: boolean;
    error: string;
    menuOpen: boolean;
    zoom_state: string;
    photo_count: number;
    thumb_count: number;
    breadcrumbs: any[];
    current_photo: any;
    current_gallery: any;
    galleries: Gallery[];
    photos: Photo[];
    thumbs: Photo[];
    thumbPages: any;
}

export function initialSessionState(): SessionState {
    return {
        loading: false,
        load_complete: true,
        error: null,
        menuOpen: false,
        zoom_state: 'cover',
        photo_count: 0,
        thumb_count: 0,
        breadcrumbs: [],
        current_photo: {},
        current_gallery: {},
        galleries: [],
        photos: [],
        thumbs: [],
        thumbPages: {}
    };
}

@StoreConfig({name: 'session'})
export class SessionStore extends Store<SessionState> {

    constructor() {
        super(initialSessionState());
    }

}


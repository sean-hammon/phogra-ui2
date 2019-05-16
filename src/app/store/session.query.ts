import { Query } from '@datorama/akita';
import {SessionState, SessionStore} from 'app/store/session.store';

export class SessionQuery extends Query<SessionState> {

    loading$ = this.select(state => state.loading);
    menuState$ = this.select(state => state.menuOpen);
    currentGallery$ = this.select(state => state.current_gallery);
    currentPhoto$ = this.select(state => state.current_photo);
    photoCount$ = this.select(state => state.photo_count);
    thumbCount$ = this.select(state => state.thumb_count);
    zoomState$ = this.select(state => state.zoom_state);

    constructor(protected store: SessionStore) {
        super(store);
    }

}

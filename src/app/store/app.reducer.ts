import { AppState, initialState } from './app.state';
import * as Actions from './app.actions';

export function appReducer(
    state: AppState = initialState,
    action: Actions.ReducerAction
) {

    switch (action.type) {

        case Actions.TOGGLE_MENU:
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            });

        case Actions.PRELOAD_BEGIN:
        case Actions.PRELOAD_COMPLETE:
            return Object.assign({}, state, {
                loading: !state.loading,
                load_complete: !state.load_complete
            });

        case Actions.FETCH_GALLERIES:
            return Object.assign({}, state, {
                loading: true,
                error: null
            });

        case Actions.SET_GALLERIES:
        case Actions.FETCH_GALLERIES_SUCCESS:
            return Object.assign({}, state, {
                galleries: action.payload
            });

        case Actions.FETCH_GALLERIES_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: 'Error'
            });

        case Actions.SET_PHOTOS:
        case Actions.FETCH_GALLERY_PHOTOS_SUCCESS:
            return Object.assign({}, state, {
                photos: action.payload
            });

        case Actions.RESET_THUMBS:
            return Object.assign({}, state, {
                thumbs: action.payload
            });

        case Actions.APPEND_THUMBS:
            return Object.assign({}, state, {
                thumbs: [...state.thumbs, action.payload]
            });

        case Actions.SET_CURRENT_GALLERY:
            return Object.assign({}, state, {
                current_gallery: action.payload
            });

        case Actions.SET_CURRENT_PHOTO:
            return Object.assign({}, state, {
                current_photo: action.payload
            });

        default:
            return state;
    }

}

import { AppState, initialState } from './app.state';
import { ActionNames, ReducerAction } from './app.actions';

export function appReducer(
    state: AppState = initialState,
    action: ReducerAction
) {
    switch (action.type) {

        case ActionNames.TOGGLE_MENU:
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            });

        case ActionNames.PRELOAD_BEGIN:
            return Object.assign({}, state, {
                loading: true,
                load_complete: false
            });

        case ActionNames.PRELOAD_COMPLETE:
            return Object.assign({}, state, {
                loading: false,
                load_complete: true
            });

        case ActionNames.FETCH_GALLERIES:
            return Object.assign({}, state, {
                loading: true,
                error: null
            });

        case ActionNames.SET_GALLERIES:
        case ActionNames.FETCH_GALLERIES_SUCCESS:
            return Object.assign({}, state, {
                galleries: action.payload
            });

        case ActionNames.FETCH_GALLERIES_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: 'Error'
            });

        case ActionNames.SET_PHOTOS:
        case ActionNames.FETCH_GALLERY_PHOTOS_SUCCESS:
            return Object.assign({}, state, {
                photos: action.payload
            });

        case ActionNames.RESET_THUMBS:
            return Object.assign({}, state, {
                thumbs: action.payload
            });

        case ActionNames.APPEND_THUMBS:
            return Object.assign({}, state, {
                thumbs: [...state.thumbs, ...action.payload]
            });

        case ActionNames.INITIALIZE_THUMB_PAGE:
            let init_state = Object.assign({}, state.thumbPages);
            init_state[action.payload] = 0;

            return Object.assign({}, state, {
                thumbPages: init_state
            });

        case ActionNames.INCREMENT_THUMB_PAGE:
            let inc_state = Object.assign({}, state.thumbPages);
            inc_state[action.payload]++;

            return Object.assign({}, state, {
                thumbPages: inc_state
            });

        case ActionNames.SET_CURRENT_GALLERY:
            return Object.assign({}, state, {
                current_gallery: action.payload
            });

        case ActionNames.SET_CURRENT_PHOTO:
            return Object.assign({}, state, {
                current_photo: action.payload
            });


        case ActionNames.TOGGLE_ZOOM:

            return Object.assign({}, state, {
                zoom_state: state.zoom_state === 'cover' ? 'fit' : 'cover'
            });

        default:
            return state;
    }

}

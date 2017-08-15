import {AppState, initialState} from "./app.state";
import * as Actions from "./app.actions";

export function appReducer (
    state: AppState = initialState,
    action: Actions.ReducerAction
) {

    switch (action.type) {

        case Actions.TOGGLE_MENU:
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            });

        case Actions.GET_GALLERIES:
            return Object.assign({}, state, {
                loading: true,
                error: null
            });

        case Actions.GET_GALLERIES_SUCCESS:
            return Object.assign({}, state, {
                galleries: action.payload
            });

        case Actions.GET_GALLERIES_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: "Error"
            });

        default:
            return state;
    }

};
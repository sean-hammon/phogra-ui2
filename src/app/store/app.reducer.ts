import {AppState, initialState} from "./app.state";
import * as Actions from "./app.actions";

export const appReducer = (
    state: AppState = initialState,
    action: Actions.ReducerAction
) => {

    switch (action.type) {

        case Actions.TOGGLE_MENU:
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            });

        default:
            return state;
    }

};

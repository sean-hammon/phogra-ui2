import {AppState, initialState} from "./app.state";
import * as Actions from "./app.actions";

export const appReducer = (
    state: AppState = initialState,
    action: Actions.ReducerAction
) => {

    switch (action.type) {

        default:
            return state;
    }

};

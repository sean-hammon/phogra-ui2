import { AdminState, initialState } from './admin.state';
import { AdminActions, ReducerAction } from './admin.actions';

export function adminReducer(
    state: AdminState = initialState,
    action: ReducerAction
) {

    switch (action.type) {

        case AdminActions.LOGIN:
            return Object.assign({}, state, {});

        case AdminActions.LOGIN_SUCCESS:
            return Object.assign({}, state, {});

        case AdminActions.LOGIN_ERROR:
            return Object.assign({}, state, {});
    }

}

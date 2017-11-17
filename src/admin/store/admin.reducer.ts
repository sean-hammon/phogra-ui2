import { AdminState, initialState } from './admin.state';
import { AdminActions, ReducerAction } from './admin.actions';

export function adminReducer(
    state: AdminState = initialState,
    action: ReducerAction
): AdminState {

    switch (action.type) {

        case AdminActions.LOGIN_SUCCESS:
            console.log('reducer', action.payload);
            return {...state, user: action.payload };

        case AdminActions.LOGIN_ERROR:
            console.log('reducer', action.payload);
            console.log(state);
            return {...state, apiError: action.payload };

        default:
            return state;
    }

}

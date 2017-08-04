import {Action} from "@ngrx/store";
import {MenuState, initialMenu} from "./menu.state";
import {TOGGLE_MENU} from "./menu.actions";

export const menuReducer = (state: MenuState = initialMenu, action: Action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return Object.assign({}, state, {
				menuOpen: !state.menuOpen
            });

        default:
            return state;
    }
};

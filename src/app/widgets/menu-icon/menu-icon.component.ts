import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {TOGGLE_MENU} from "../../store/app.actions";

@Component({
    selector: 'app-menu-icon',
    templateUrl: './menu-icon.component.html',
    styleUrls: ['./menu-icon.component.sass']
})
export class MenuIconComponent {

    menuOpen: boolean;

    constructor(private store: Store<any>)
    {
        store.select('appState')
            .subscribe(state => {
                this.menuOpen = state.menuOpen;
            });
    }

    toggleMenu()
    {
        this.store.dispatch({
            type: TOGGLE_MENU
        });
    }

}

import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {TOGGLE_MENU} from '../../store/app.actions';
import { menuState } from '../../store/app.state';

@Component({
    selector: 'app-menu-icon',
    templateUrl: './menu-icon.component.html',
    styleUrls: ['./menu-icon.component.sass']
})
export class MenuIconComponent {

    menuOpen: boolean;

    constructor(private store: Store<any>) {
        store.select(menuState)
            .subscribe(open => {
                this.menuOpen = open;
            });
    }

    toggleMenu() {
        this.store.dispatch({
            type: TOGGLE_MENU
        });
    }

}

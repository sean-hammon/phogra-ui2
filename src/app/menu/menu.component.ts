import { Component } from '@angular/core';
import { Store } from "@ngrx/store";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass'],
    host: {
        '[class.open]': 'menuOpen'
    }
})
export class MenuComponent {

    menuOpen: boolean;

    constructor(private store: Store<any>)
    {
        store.select('appState')
            .subscribe(state => {
                this.menuOpen = state.menuOpen;
            });

    }

}

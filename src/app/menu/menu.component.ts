import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { menuState } from "../store/app.state";

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
        store.select(menuState)
            .subscribe(open => {
                this.menuOpen = open;
            });
    }

}

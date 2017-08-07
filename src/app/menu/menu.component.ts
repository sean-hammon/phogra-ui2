import { Component, OnInit } from '@angular/core';
import { StateService } from "../state.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass'],
    host: {
        '[class.open]': "state.menuOpen"
    }
})
export class MenuComponent implements OnInit {

    constructor(
        private state: StateService
	) { }

    ngOnInit() {
    }

}

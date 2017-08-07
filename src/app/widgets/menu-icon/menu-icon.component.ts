import { Component } from '@angular/core';
import { StateService } from "../../state.service";

@Component({
    selector: 'app-menu-icon',
    templateUrl: './menu-icon.component.html',
    styleUrls: ['./menu-icon.component.sass']
})
export class MenuIconComponent {

    constructor(
        private state: StateService
    ) { }

    toggleMenu() {
        this.state.toggleMenu();
    }

}

import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-menu-icon',
    templateUrl: './menu-icon.component.html',
    styleUrls: ['./menu-icon.component.sass']
})
export class MenuIconComponent implements OnInit {

    @Output() menuToggled = new EventEmitter();
    menuOpen = false;

    constructor() {
    }

    ngOnInit() {
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
        this.menuToggled.emit(this.menuOpen);
    }

}

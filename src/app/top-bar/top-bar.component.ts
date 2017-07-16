import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import "rxjs/add/operator/filter";

@Component({
    selector: 'app-topbar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

    @Output() menuToggled = new EventEmitter();
    menuOpen = false;

    constructor(private router: Router) {}


    ngOnInit() {

    }


    toggleMenu() {
        this.menuOpen = !this.menuOpen;
        this.menuToggled.emit(this.menuOpen);
    }
}


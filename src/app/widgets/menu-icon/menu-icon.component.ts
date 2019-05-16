import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu-icon',
    templateUrl: './menu-icon.component.html',
    styleUrls: ['./menu-icon.component.sass']
})
export class MenuIconComponent implements OnInit, OnDestroy{

    menuOpen: boolean;
    subscription: any;

    constructor(
    ) {}

    ngOnInit() {
    }


    ngOnDestroy() {
    }


    toggleMenu() {
    }

}

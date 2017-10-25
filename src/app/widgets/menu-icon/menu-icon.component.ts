import { Component, OnDestroy, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import { AppToogleMenuAction } from '../../store/app.actions';
import { menuState } from '../../store/app.state';

@Component({
    selector: 'app-menu-icon',
    templateUrl: './menu-icon.component.html',
    styleUrls: ['./menu-icon.component.sass']
})
export class MenuIconComponent implements OnInit, OnDestroy{

    menuOpen: boolean;
    subscription: any;

    constructor(
        private store: Store<any>
    ) {}

    ngOnInit() {
        this.subscription = this.store.select(menuState)
            .subscribe(open => {
                this.menuOpen = open;
            });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    toggleMenu() {
        this.store.dispatch(new AppToogleMenuAction());
    }

}

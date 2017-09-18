import {Component, HostBinding, OnInit} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { galleryState, menuState } from '../store/app.state';
import { Gallery } from '../../phogra/galleries/gallery';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { TOGGLE_MENU } from '../store/app.actions';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

    @HostBinding('class.open')
    public get isOpen() {
        return this.menuOpen;
    }

    menuOpen: boolean;
    rootGalleries: Gallery[];

    constructor(
        private store: Store<any>,
        private router: Router,
        private galleries: GalleryProvider
    ) {
        store.select(menuState)
            .subscribe(open => {
                this.menuOpen = open;
            });
        store.select(galleryState)
            .subscribe(() => {
                // Don't need the value from the store. We just want to
                // know when it changes from empty to not.
                this.rootGalleries = this.galleries.fetchRootGalleries();
            })
    }


    ngOnInit() {

        this.router.events
            .filter(event => event instanceof NavigationStart && this.menuOpen)
            .subscribe(() => {
                this.store.dispatch({
                    type: TOGGLE_MENU
                });
            });
    }

}

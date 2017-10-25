import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { galleryState, menuState } from '../store/app.state';
import { Gallery } from '../../phogra/galleries/gallery';
import { GalleryProvider } from '../../phogra/galleries/gallery.provider';
import { AppToogleMenuAction } from '../store/app.actions';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit, OnDestroy {

    @HostBinding('class.open')
    public get isOpen() {
        return this.menuOpen;
    }

    menuOpen: boolean;
    rootGalleries: Gallery[];
    subscriptions: any;

    constructor(
        private store: Store<any>,
        private router: Router,
        private galleries: GalleryProvider
    ) {
        this.subscriptions = {
            menu_state: null,
            gallery_state: null,
            nav_start: null
        };
    }


    ngOnInit() {

        this.subscriptions.menu_state = this.store.select(menuState)
            .subscribe(open => {
                this.menuOpen = open;
            });

        this.subscriptions.gallery_state = this.store.select(galleryState)
            .subscribe(() => {
                // Don't need the value from the store. We just want to
                // know when it changes from empty to not.
                this.rootGalleries = this.galleries.fetchRootGalleries();
            });

        this.subscriptions.nav_start = this.router.events
            .filter(event => event instanceof NavigationStart && this.menuOpen)
            .subscribe(() => {
                this.store.dispatch(new AppToogleMenuAction());
            });
    }


    ngOnDestroy () {
        this.subscriptions.menu_state.unsubscribe();
        this.subscriptions.gallery_state.unsubscribe();
        this.subscriptions.nav_start.unsubscribe();
    }

}
